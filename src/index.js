import './style.css';
import {classedElement, appendChildren, showSideBar} from './renderers'

(() => {
    const logo = classedElement('div', ['logo', 'header']);
    const title = classedElement('div', ['proj-title', 'header']);
    const projList = classedElement('ul', ['proj-list']);
    const toDoDiv = classedElement('div', ['todo-holder']);

    appendChildren(document.body, logo, title, projList, toDoDiv);

    title.addEventListener('click', showSideBar);

    logo.textContent = 'To Do App';
    title.textContent = 'All Projects';
    projList.textContent = 'Projects';
    toDoDiv.textContent = 'To Do cards here';
})();
