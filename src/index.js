import './style.css';
import {showSideBar, updateProjSideBar} from './renderers';
import {storage} from './controllers';

const deleteProject = (e) => {
    const myStorage = storage()
    const projDiv = e.target.parentElement.parentElement;

    if (myStorage.getProjects().includes(projDiv.textContent)) {
        myStorage.removeProject(projDiv.textContent);
        projDiv.remove();
    }
}

const addProj = (storage) => {
    const projName = prompt();
    storage.addProject(projName);
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