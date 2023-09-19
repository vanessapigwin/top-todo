import { classedElement, appendChildren} from "./template";
import { controller } from "./controllers";
import {Priority} from './models';

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
        checkbox.name = 'isDone';
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isDone;

        const title = classedElement('input', ['todo-data']);
        title.name = 'title';
        title.value = todo.title;
        title.required = true;
        title.disabled = true;

        const priorityButton = classedElement('select');
        priorityButton.name = 'priority';
        priorityButton.textContent = todo.priority;
        
        // add current priority as option 0, then add alternatives
        const option = classedElement('option');
        option.value = todo.priority;
        option.textContent = todo.priority;
        priorityButton.appendChild(option);
        const options = Object.keys(Priority).filter(value => value !== todo.priority);
        for (const choice of options) {
            const option = classedElement('option');
            option.value = choice;
            option.textContent = choice;
            priorityButton.appendChild(option);
        }
        priorityButton.disabled = true;

        const dateField = classedElement('input', ['todo-data']);
        dateField.name = 'dueDate';
        dateField.type = 'date';
        dateField.value = todo.dueDate;
        dateField.disabled = true;
        
        const descField = classedElement('textarea', ['todo-data']);
        descField.name = 'description';
        descField.value = todo.description;
        descField.disabled = true;

        const buttonDiv = classedElement('div', ['todo-data']);
        const editButton = classedElement('button', ['todo-edit']);
        editButton.type = 'submit';
        editButton.textContent = 'Edit';
        const delButton = classedElement('button', ['todo-delete']);
        delButton.type = 'reset';
        delButton.textContent = 'Delete';
        appendChildren(buttonDiv, [editButton, delButton]);

        appendChildren(form, [
            checkbox, title, dateField, priorityButton, descField, buttonDiv
        ]);
    
        checkbox.addEventListener('click', controller.updateTask);
        form.addEventListener('submit', controller.editCard);
        form.addEventListener('reset', controller.delCard);
        document.querySelector('#cardarea').appendChild(form);
    }
}

const enableCard = (e) => {
    document.querySelector('input[name=title]').disabled = false;
    document.querySelector('select').disabled = false;
    document.querySelector('input[name=dueDate]').disabled = false;
    document.querySelector('textarea').disabled = false;
    document.querySelector('.todo-edit').textContent = 'Done';
    e.target.addEventListener('submit', controller.getEdits);
}

const disableCard = (e) => {
    document.querySelector('input[name=title]').disabled = true;
    document.querySelector('select').disabled = true;
    document.querySelector('input[name=dueDate]').disabled = true;
    document.querySelector('textarea').disabled = true;
    document.querySelector('.todo-edit').textContent = 'Edit';
    e.target.removeEventListener('submit', controller.getEdits);
}

export {
    updateProjSideBar,
    initDefault,
    toggleModal,
    renderCardArea,
    updateTitleBar,
    enableCard,
    disableCard
}