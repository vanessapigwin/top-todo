import './style.css';
import {updateProjSideBar} from './renderers'

(() => {
    const projects = ['Project1', 'Project2'];
    updateProjSideBar(document.querySelector('#projects'), projects)
})();
