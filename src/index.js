import './style.css';
import {showSideBar, clearProjSidebar, updateProjSideBar} from './renderers';

const deleteProject = () => {
    console.log('deleteProj')
}

const updateProjList = (projects) => {
    updateProjSideBar(document.querySelector('#projects'), projects);
    document.querySelectorAll('#projects > div > button').forEach(button => {
        button.addEventListener('click', deleteProject);
    });
}

(() => {
    // const fakeDB = hasStorage? localStorage: {};
    const projects = JSON.parse(localStorage.getItem('projects'));

    const projList = document.querySelector('#projects');
    if (projects) {
        clearProjSidebar(projList);
        updateProjList(projects);
    }
        
    document.querySelector('.proj-title').addEventListener('click', showSideBar);
})();