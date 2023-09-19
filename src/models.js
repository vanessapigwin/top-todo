import { compareAsc, format } from 'date-fns'

const Priority = {
    Low: 'Low',
    Medium: 'Med',
    High: 'High',
}

const Todo = (title, description, dueDate, priority, isDone, project) => {
    return {title, description, dueDate, priority, isDone, project}
}

// reference: MDN web docs - Using the web storage API
const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = 'best_cat';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException && (
                e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage &&
            storage.length !== 0
        );
    }
}

const storage = () => {
    const activeStorage = storageAvailable('localStorage')? localStorage: {};

    const setItem = (key, value) => activeStorage[key] = JSON.stringify(value);
    const getItem = (key) => JSON.parse(activeStorage[key]);
    const removeItem = (key) => {delete activeStorage[key]};
    
    return {
        activeStorage,
        setItem,
        getItem,
        removeItem,
    }
}

const projectMapper = () => {
    const _storage = storage();
    const getProjects = () => {
        try {
            _storage.getItem('projects');
        } catch (e) {
            _storage.setItem('projects', []);
            _storage.setItem('Default', []);
        }
        return _storage.getItem('projects');
    }

    const addProject = (projName) => {
        const projects = getProjects();
        projects.push(projName);
        _storage.setItem('projects', projects);
        _storage.setItem(projName, []);
    }

    const removeProject = (projName) => {
        _storage.setItem('projects', getProjects().filter(project => projName !== project));
        _storage.removeItem(projName);
    }

    return {getProjects, addProject, removeProject}
}

const todoMapper = () => {
    const _storage = storage();
    const getTodos = (projectName) => _storage.getItem(projectName);
    const addTodos = (projectName, todo) => {
        const list = getTodos(projectName);
        list.push(todo);
        _storage.setItem(projectName, list)
    }

    const removeTodo = (projName, idx) => {
        // todo: fix dependency on idx
        const list = getTodos(projName);
        list.splice(idx, 1)
        _storage.setItem(projName, list);
    }

    const updateTodo = (projName, idx, todo) => {
        // todo: fix dependency on idx
        const list = getTodos(projName);
        list.splice(idx, 1, todo);
        _storage.setItem(projName, list);
    }

    const getAllTodos = () => {
        const mapper = projectMapper();
        const projects = mapper.getProjects();
        projects.push('Default');
        return projects.reduce((list, project) => list.concat(getTodos(project)), [])
    }

    const todosByImportance = (criteria) => {
        const allTodos = getAllTodos();
        return allTodos.filter( todo => todo['priority'] === criteria);
    }

    return {getTodos, addTodos, removeTodo, updateTodo, todosByImportance}
 }


const processTodoData = (projectName, data) => {
    const mapper = todoMapper();
    let obj = {}
    data.forEach((value, key) => obj[key] = value);
    let todo = Todo(
        obj.title,
        obj.description,
        obj.dueDate,
        obj.priority,
        false,
        projectName
    );
    mapper.addTodos(projectName, todo);
}

const processTodoEdit = (projectName, idx, data) => {
    // todo: fix dependency on idx
    const mapper = todoMapper();
    let obj = {}
    data.forEach((value, key) => obj[key] = value);
    let todo = Todo(
        obj.title,
        obj.description,
        obj.dueDate,
        obj.priority,
        obj.isDone? true: false,
        projectName
    );
    mapper.updateTodo(projectName, idx, todo);
}

const processDoneTodo = (projectName, idx) => {
    // todo: fix dependency on idx
    const mapper = todoMapper();
    const todo = mapper.getTodos(projectName)[idx];
    todo.isDone = todo.isDone? false: true;
    mapper.updateTodo(projectName, idx, todo);
}

export {Priority, Todo, projectMapper, todoMapper, processTodoData, processTodoEdit, processDoneTodo}