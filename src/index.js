import './style.css';
import  {updateProjSideBar, toggleModal} from './renderers';
import {addProjForm, addTodoForm } from './template';
import {storage, processTodoData} from './controllers';

const addProj = () => {
    toggleModal();
    const form = addProjForm();
    form.addEventListener('submit', (e) => processProjForm(e));
}

const deleteProject = (e) => {
    const _storage = storage();
    const projDiv = e.target.parentElement.parentElement;

    if (_storage.getProjects().includes(projDiv.textContent)) {
        _storage.removeProject(projDiv.textContent);
        projDiv.remove();
    }
}

const processProjForm = (e) => {
    e.preventDefault();
    const _storage = storage()
    const projName = e.target[0].value;
    const projects = _storage.getProjects();

    if (projects.includes(projName)) {
        alert('Please use a unique name and try again');
    } else {
        _storage.addProject(projName);
        updateProjSideBar([projName]);
    }
    e.target.remove();
    toggleModal();
}

const initProjList = () => {
    const _storage = storage();
    const projects = _storage.getProjects();
    if (projects.length > 0) {
        updateProjSideBar(projects);
    }
}

const addTodo = (storage) => {
    toggleModal();
    const form = addTodoForm();
    form.addEventListener('submit', (e) => {processTodoForm(e, storage)});
}

const processTodoForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    processTodoData(formData);
    e.target.remove();
    toggleModal();
}

(() => {
    initProjList();

    document.querySelector('#addproj').addEventListener('click', addProj);
    document.querySelector('#addtodo').addEventListener('click', addTodo);
})();

export {deleteProject}