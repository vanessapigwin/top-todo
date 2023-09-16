import './style.css';
import  {updateProjSideBar, toggleModal} from './renderers';
import {addProjForm, addTodoForm } from './template';
import {projectMapper, todoMapper, processTodoData} from './models';

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
    }
}

const initProjList = () => {
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
const addTodo = (projName) => {
    toggleModal();
    const form = addTodoForm();
    form.addEventListener('submit', e => processTodoForm(e, projName));
}

const processTodoForm = (e, projectName) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    processTodoData(projectName, formData);
    updateCardArea(projectName);
    e.target.remove();
    toggleModal();
}

const initTaskList = (currentProj) => {
    const mapper = todoMapper();
    const todos = mapper.getTodos(currentProj);
    console.log(todos);
}

(() => {
    const currentProj = 'Default';
    initProjList();
    initTaskList(currentProj);

    document.querySelector('#addproj').addEventListener('click', addProj);
    document.querySelector('#addtodo').addEventListener('click', () => addTodo(currentProj));
})();

export {deleteProject}