import { classedElement, appendChildren} from "./template";
import { controller } from "./controllers";
import { Priority } from './models';

const toggleModal = () => document.querySelector('.modal').classList.toggle('modal-visible');

const initDefault = () => {
    const defaultProj = document.querySelector('.proj-item > div:first-of-type');
    defaultProj.addEventListener('click', controller.filterByProj);
}

const updateProjSideBar = (items) => {
    for (let item of items) {
        const projDiv = classedElement('div', ['proj-item', 'added-projs']);
        const projTitle = classedElement('div');
        const projButton = classedElement('button');
        const buttonImg = classedElement('img', ['proj-icon']);

        buttonImg.src = new URL('./icons/remove.png', import.meta.url);
        projTitle.textContent = item;
        projButton.appendChild(buttonImg);
        appendChildren(projDiv, [projTitle, projButton]);
        
        document.querySelector('#projects').appendChild(projDiv);
        projButton.addEventListener('click', controller.deleteProject);
        projTitle.addEventListener('click', controller.filterByProj);
    }
}

const updateTitleBar = (filterName) => {
    const projTitle = document.querySelector('.proj-title');
    projTitle.textContent = filterName;
    for (const elem of document.querySelectorAll('.categ-list > *')) {
        if (elem.textContent === filterName)
            elem.classList.add('list-title');
        else
            elem.classList.remove('list-title');
    }
}

const clearCardArea = () => {
    const children = document.querySelectorAll('#cardarea > *');
    children.forEach(child => {
        document.querySelector('#cardarea').removeChild(child);
    })
}

const renderCardArea = (todos) => {
    clearCardArea();
    for (let todo of todos) {
        const form = classedElement('form', ['todo-card']);
        form.dataset.idx = todos.indexOf(todo);

        const checkbox = classedElement('input', ['todo-data']);
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isDone;

        const title = classedElement('input', ['todo-data']);
        title.value = todo.title;
        title.required = true;
        title.disabled = true;

        const priorityButton = classedElement('div', ['priority-button']);
        priorityButton.textContent = todo.priority;

        const dateField = classedElement('div', ['todo-data']);
        dateField.textContent = todo.dueDate;
        
        const descField = classedElement('div', ['todo-data']);
        descField.textContent = todo.description;

        const editButton = classedElement('button', ['todo-data', 'todo-edit']);
        editButton.type = 'submit';
        editButton.textContent = 'Edit';

        const delButton = classedElement('button', ['todo-data', 'todo-delete']);
        delButton.type = 'reset';
        delButton.textContent = 'Delete';

        appendChildren(form, [checkbox, title, priorityButton, dateField, descField, editButton, delButton]);
        document.querySelector('#cardarea').appendChild(form);

        form.addEventListener('submit', controller.editCard);
        form.addEventListener('reset', controller.delCard);
    }
}

export {
    updateProjSideBar,
    initDefault,
    toggleModal,
    renderCardArea,
    updateTitleBar
}