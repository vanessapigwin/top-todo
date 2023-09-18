import { projectMapper, todoMapper, processTodoData } from './models';
import { addProjForm, addTodoForm } from './template';
import { toggleModal, initDefault, updateProjSideBar, renderCardArea, updateTitleBar } from './renderers';

const controller = (()=> {
    // project
    const addProj = () => {
        toggleModal();
        const form = addProjForm();
        form.addEventListener('submit', (e) => processProjForm(e));
    }

    const deleteProject = (e) => {
        const mapper = projectMapper();
        const projDiv = e.target.parentElement.parentElement;

        if (mapper.getProjects().includes(projDiv.textContent)) {
            mapper.removeProject(projDiv.textContent);
            projDiv.remove();
            filterByProj();
        }
    }

    const initProjList = () => {
        initDefault();
        const mapper = projectMapper();
        const projects = mapper.getProjects();
        if (projects.length > 0) {
            updateProjSideBar(projects);
        }
    }

    const processProjForm = (e) => {
        e.preventDefault();
        const mapper = projectMapper();
        const projName = e.target[0].value;
        const projects = mapper.getProjects();

        if (projects.includes(projName)) {
            alert('Please use a unique name and try again');
        } else {
            mapper.addProject(projName);
            updateProjSideBar([projName]);
        }
        e.target.remove();
        toggleModal();
    }

    // todo
    const addTodo = () => {
        const projTitle = document.querySelector('.proj-title').textContent;
        const projList = projectMapper().getProjects();
        const projName = (projList.includes(projTitle))? projTitle: 'Default';

        toggleModal();
        const form = addTodoForm();
        form.addEventListener('submit', e => processTodoForm(e, projName));
    }

    const processTodoForm = (e, currentProj) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        processTodoData(currentProj, formData);
        updateTaskList(currentProj);
        e.target.remove();
        toggleModal();
    }

    const updateTaskList = (currentProj) => {
        const mapper = todoMapper();
        const todos = mapper.getTodos(currentProj);
        updateTitleBar(currentProj);
        renderCardArea(todos);
    }

    // filters
    const filterByImportance = (e) => {
        // TODO: complete this area
        updateTitleBar(e.target.textContent);
    }

    const filterByDate = (e) => {
        // TODO: complete this area
        updateTitleBar(e.target.textContent);
    }

    const filterByProj = (e) => {
        const currentProj = e? e.target.textContent: 'Default';
        updateTaskList(currentProj);
    }

    const editCard = (e) => {
        const idx = e.target.dataset.idx;
        const data = new FormData(e.target);
        console.log(data)
        e.preventDefault()
        console.log(idx)
    }

    const delCard = (e) => {
        const projTitle = document.querySelector('.proj-title').textContent;
        const idx = e.target.dataset.idx;
        const mapper = todoMapper();
        mapper.removeTodo(projTitle, idx);
        updateTaskList(projTitle);
        e.preventDefault();
    }

    return {
        initProjList, addProj, deleteProject,
        addTodo, updateTaskList, 
        filterByImportance,filterByDate, filterByProj,
        delCard, editCard
    }

})();

export {controller}