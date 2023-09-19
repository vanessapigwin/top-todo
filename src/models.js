import { compareAsc, format, add, parse } from 'date-fns';

const Priority = {
    Low: 'Low',
    Medium: 'Med',
    High: 'High',
}

const Todo = (id, title, description, dueDate, priority, isDone, project) => {
    return {id, title, description, dueDate, priority, isDone, project}
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

    const addProject = (projectName) => {
        const projects = getProjects();
        projects.push(projectName);
        _storage.setItem('projects', projects);
        _storage.setItem(projectName, []);
    }

    const removeProject = (projectName) => {
        _storage.setItem('projects', getProjects().filter(project => projectName !== project));
        _storage.removeItem(projectName);
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

    const removeTodo = (projectName, idx) => {
        const list = getTodos(projectName);
        _storage.setItem(projectName, list.filter( item => item.id !== idx));
    }

    const updateTodo = (projectName, todo) => {
        const list = getTodos(projectName);
        const idx = list.map(item => item.id).indexOf(todo.id);
        list.splice(idx, 1, todo);
        _storage.setItem(projectName, list);
    }

    const getAllTodos = () => {
        const mapper = projectMapper();
        const projects = mapper.getProjects();
        projects.push('Default');
        return projects.reduce((list, project) => list.concat(getTodos(project)), [])
    }

    const todosByImportance = (criteria) => {
        const allTodos = getAllTodos();
        return allTodos.filter(todo => todo['priority'] === criteria);
    }

    const todosByDate = (date) => {
        const today = new Date();
        const allTodos = getAllTodos();

        if (date === 'Today') {
            return allTodos
                .filter(todo => todo['dueDate'] === format(today, 'yyyy-MM-dd'))
        } else
        if (date === 'This Week') {
            const nextWeek = add(today, {weeks: 1});
            return allTodos
                .filter(todo => 
                    parse(todo['dueDate'], 'yyyy-MM-dd', new Date()) > today &&
                    parse(todo['dueDate'], 'yyyy-MM-dd', new Date()) <= nextWeek
                )
        } else 
        if (date === 'Missed') {
            console.log('missed')
        }
        return allTodos
    }

    return {getTodos, addTodos, removeTodo, updateTodo, todosByImportance, todosByDate}
 }


const processTodoData = (projectName, data) => {
    const mapper = todoMapper();
    let obj = {}
    data.forEach((value, key) => obj[key] = value);
    let todo = Todo(
        String(new Date().valueOf()),
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
        idx,
        obj.title,
        obj.description,
        obj.dueDate,
        obj.priority,
        obj.isDone? true: false,
        projectName
    );
    mapper.updateTodo(projectName, todo);
}

const processDoneTodo = (projectName, idx) => {
    const mapper = todoMapper();
    const list = mapper.getTodos(projectName);
    const id = list.map(item => item.id).indexOf(idx);
    const todo = mapper.getTodos(projectName)[id];
    todo.isDone = todo.isDone? false: true;
    mapper.updateTodo(projectName, todo);
}

export {Priority, Todo, projectMapper, todoMapper, processTodoData, processTodoEdit, processDoneTodo}