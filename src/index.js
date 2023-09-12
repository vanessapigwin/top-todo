import './style.css';
import {showSideBar, updateProjSideBar} from './renderers'

const deleteProject = () => {
    console.log('deleteProj')
}

const updateProjList = (projects) => {
    updateProjSideBar(document.querySelector('#projects'), projects);
    document.querySelectorAll('#projects > div > button').forEach(button => {
        button.addEventListener('click', deleteProject);
    })
}

(() => {
    document.querySelector('.proj-title').addEventListener('click', showSideBar);

    const projects = ['Project1', 'Project2'];
    updateProjList(projects);

})();