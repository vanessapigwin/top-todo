import {Priority} from './models';

const classedElement = (tag, cls) => {
    const element = document.createElement(tag);
    if (cls)
        element.classList.add(...cls);
    return element;
}

const appendChildren = (parent, children) => {
    children.forEach(child => parent.appendChild(child));
}

const TodoButton = () => {
    const button = classedElement('button');
    const buttonImg = classedElement('img');
    button.id = 'addtodo';
    buttonImg.src = new URL('./icons/add.png', import.meta.url);
    button.appendChild(buttonImg);
    return button
}

const Logo = () => {
    const logo = classedElement('div', ['logo', 'header']);
    const logoImg = classedElement('img');
    const logoTitle = classedElement('div');

    logoTitle.textContent = 'To Do';
    logoImg.src = new URL('./icons/doneall.png', import.meta.url);
    appendChildren(logo, [logoImg, logoTitle]);

    return logo;
}

const Dropdown = () => {
    const projTitleDiv = classedElement('div', ['proj-title', 'header']);
    const projTitleContent = classedElement('div');
    const projImg = classedElement('img');

    projTitleContent.textContent = 'All Projects';
    projImg.src = new URL('./icons/arrow_dd.png', import.meta.url);
    appendChildren(projTitleDiv, [projTitleContent, projImg]);

    return projTitleDiv;
}

const Modal = () => {
    const modalDiv = classedElement('div', ['modal']);
    modalDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.removeChild(e.target.lastElementChild);
            document.querySelector('.modal').classList.toggle('modal-visible');
        }
            
    });
    return modalDiv
}

const Sidebar = () => {
    // by priority
    const priorities = Object.keys(Priority);
    const importanceDiv = classedElement('div', ['list-title']);
    const importanceList = classedElement('ul', ['categ-list', 'importance']);

    importanceDiv.textContent = 'By importance';
    populateSidebarList(importanceList, priorities);
    
    // by deadline
    const deadlines = ['Today', 'This Week', 'Missed'];
    const timeLineDiv = classedElement('div', ['list-title']);
    const timeLineList = classedElement('ul', ['categ-list', 'timeline']);

    timeLineDiv.textContent = 'By deadline';
    populateSidebarList(timeLineList, deadlines);

    // by project title
    const projList = classedElement('ul', ['categ-list', 'projects']);
    projList.id = 'projects';
    initProjSideBar(projList);
    
    const sidebarContents = classedElement('div', ['sidebar']);
    appendChildren(sidebarContents, [
        importanceDiv, 
        importanceList, 
        timeLineDiv, 
        timeLineList, 
        projList
    ]);

    return sidebarContents;
}

const initProjSideBar = (projectList) => {
    const projDiv = classedElement('div', ['proj-item']);
    const projTitle = classedElement('div');
    const addProjButton = classedElement('button');
    const buttonImg = classedElement('img', ['proj-icon']);
    buttonImg.id = 'addproj';

    buttonImg.src = new URL('./icons/add.png', import.meta.url);
    projTitle.textContent = 'All Projects';
    addProjButton.appendChild(buttonImg);

    appendChildren(projDiv, [projTitle, addProjButton]);
    
    projectList.appendChild(projDiv);
}

const showSideBar = () => {
    document.querySelector('.sidebar').classList.toggle('visible');
    document.querySelector('.proj-title > img').classList.toggle('hidden');
}

const populateSidebarList = (ul, items) => {
    for (let item of items) {
        const li = classedElement('li');
        li.textContent = item;
        ul.appendChild(li);
    }
    return ul;
}

const ToDoArea = () => {
    const toDoDiv = classedElement('div', ['todo-holder']);
    const cardHolder = classedElement('div', ['card-holder']);
    cardHolder.id = 'cardarea';
    appendChildren(toDoDiv, [cardHolder, TodoButton()]);

    return toDoDiv
}

const addProjForm = () => {
    const form = classedElement('form', ['modal-content']);
    const textField = classedElement('input');
    const button = classedElement('input');
    form.id = 'addProjForm';
    button.type = 'submit';
    button.value = 'Add Project';
    textField.required = true;
    textField.placeholder = 'New Project';
    appendChildren(form, [textField, button]);
    document.querySelector('.modal').appendChild(form);
    
    return form
}

const addTodoForm = () => {
    // title
    const titleField = classedElement('input');
    titleField.name = 'title';
    titleField.placeholder = 'Task name';
    titleField.required = true;

    // description
    const descField = classedElement('textarea');
    descField.name = 'description';
    descField.placeholder = 'Description';
    // descField.type = 'textarea';
    descField.rows = 5;

    // dueDate
    const dateField = classedElement('input');
    dateField.type = 'date';
    dateField.name = 'dueDate';
    dateField.required = true;

    // priority
    const priorityChoice = classedElement('div', ['priority-buttons']);
    for (const choice of Object.keys(Priority)) {
        const container = classedElement('div', ['priority-button'])
        const button = classedElement('input');
        button.type = 'radio';
        button.id = `choice${choice}`;
        button.name = 'priority';
        container.appendChild(button);

        const label = classedElement('label');
        label.for = `choice${choice}`;
        label.textContent = Priority[choice];
        container.appendChild(label);

        button.checked = true;
        priorityChoice.append(container);
    }

    const button = classedElement('input');
    button.type = 'submit';
    button.value = 'Add Todo';

    const form = classedElement('form', ['modal-content']);
    form.id = 'addTodoForm';
    
    appendChildren(form, [titleField, descField, dateField, priorityChoice, button]);

    document.querySelector('.modal').appendChild(form);
    
    return form
}

(() => {
    appendChildren(document.body, [
        Modal(),
        Logo(), 
        Dropdown(), 
        Sidebar(), 
        ToDoArea()
    ]);
    document.querySelector('.proj-title').addEventListener('click', showSideBar);
})();

export {
    classedElement,
    appendChildren,
    addProjForm,
    addTodoForm 
}