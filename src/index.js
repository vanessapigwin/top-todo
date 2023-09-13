import './style.css';
import {showSideBar, updateProjSideBar, clearProjSidebar} from './renderers';
import {storage} from './controller';

const deleteProject = (e) => {
    const myStorage = storage()
    const projDiv = e.target.parentElement.parentElement;
    console.log(myStorage.getProjects());
    // myStorage.removeItem()
    // projDiv.remove();
    console.log(projDiv.textContent);
}

const addProj = (storage) => {
    const projName = prompt();
    const projects = storage.getProjects('projects');
    projects.push(projName);
    storage.setItem('projects', projects);
    updateProjList([projName]);
}

const updateProjList = (projects) => {
    updateProjSideBar(projects);
    document.querySelectorAll('#projects > div.added-projs > button').forEach(button => {
        button.addEventListener('click',  deleteProject);
    });
}

(() => {
    const myStorage = storage();
    const projects = myStorage.getProjects('projects');

    if (projects)
        updateProjList(projects);
    
    document.querySelector('.proj-title').addEventListener('click', showSideBar);
    document.querySelector('#addproj').addEventListener('click', 
    () => addProj(myStorage));
})();