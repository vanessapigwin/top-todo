import './style.css';
import {showSideBar, updateProjSideBar, toggleModal, addProjForm, addTodoForm } from './renderers';
import {storage} from './controllers';
import {Priority, Todo} from './models';

const deleteProject = (e) => {
    const myStorage = storage()
    const projDiv = e.target.parentElement.parentElement;

    if (myStorage.getProjects().includes(projDiv.textContent)) {
        myStorage.removeProject(projDiv.textContent);
        projDiv.remove();
    }
}

const addProj = (storage) => {
    toggleModal();
    const form = addProjForm();
    form.addEventListener('submit', (e) => processProjForm(e, storage));
}

const processProjForm = (e, storage) => {
    e.preventDefault();
    const projName = e.target[0].value;
    const projects = storage.getProjects();

    if (projects.includes(projName)) {
        alert('Please use a unique name and try again');
    } else {
        storage.addProject(projName);
        updateProjList([projName])
    }
    e.target.remove();
    toggleModal();
}

const updateProjList = (projects) => {
    updateProjSideBar(projects);
    document.querySelectorAll('#projects > div.added-projs > button').forEach(button => {
        button.addEventListener('click',  deleteProject);
    });
}

const addTodo = (storage) => {
    toggleModal();
    const form = addTodoForm();
    form.addEventListener('submit', (e) => {processTodoForm(e, storage)});
}

const processTodoForm = (e, storage) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    console.log(...formData)
    e.target.remove();
    toggleModal();
}

(() => {
    const myStorage = storage();
    const projects = myStorage.getProjects('projects');

    if (projects) {
        updateProjList(projects);
    }
    
    document.querySelector('.proj-title').addEventListener('click', showSideBar);
    document.querySelector('#addtodo').addEventListener('click', () => addTodo(myStorage));
    document.querySelector('#addproj').addEventListener('click', () => addProj(myStorage));
})();