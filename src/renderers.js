const classedElement = (tag, cls) => {
    const element = document.createElement(tag);
    if (cls)
        element.classList.add(...cls);
    
    return element;
}

const appendChildren = (parent, children) => {
    children.forEach(child => parent.appendChild(child));
}

const makeLogo = () => {
    const logo = classedElement('div', ['logo', 'header']);
    const logoImg = classedElement('img');
    const logoTitle = classedElement('div');

    logoTitle.textContent = 'To Do';
    logoImg.src = new URL('./icons/doneall.png', import.meta.url);
    appendChildren(logo, [logoImg, logoTitle]);

    return logo;
}

const makeDropDown = () => {
    const projTitleDiv = classedElement('div', ['proj-title', 'header']);
    const projTitleContent = classedElement('div');
    const projImg = classedElement('img');

    projTitleContent.textContent = 'All Projects';
    projImg.src = new URL('./icons/arrow_dd.png', import.meta.url);
    appendChildren(projTitleDiv, [projTitleContent, projImg]);

    return projTitleDiv;
}

const makeModal = () => {
    const modalDiv = classedElement('div', ['modal']);
    modalDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal'))
            toggleModal();
    });
    return modalDiv
}

const toggleModal = () => document.querySelector('.modal').classList.toggle('modal-visible');

const getAddProjForm = () => {
    const form = classedElement('form', ['modal-content']);
    const textField = classedElement('input');
    const button = classedElement('input');
    form.id = 'addProjForm';
    button.type = 'submit';
    button.value = 'Add Project';
    textField.type = 'text';
    textField.placeholder = 'New Project';
    appendChildren(form, [textField, button]);

    document.querySelector('.modal').appendChild(form);
    
    return form
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

const updateProjSideBar = (items) => {
    for (let item of items) {
        const projDiv = classedElement('div', ['proj-item', 'added-projs']);
        const projTitle = classedElement('div');
        const addProjButton = classedElement('button');
        const buttonImg = classedElement('img', ['proj-icon']);

        buttonImg.src = new URL('./icons/remove.png', import.meta.url);
        projTitle.textContent = item;
        addProjButton.appendChild(buttonImg);

        appendChildren(projDiv, [projTitle, addProjButton]);
        document.querySelector('#projects').appendChild(projDiv);
    }
}

const makeSidebar = () => {
    // by priority
    const priorities = ['High', 'Moderate', 'Low'];
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

// initialize UI
(() => {
    // todo div
    const todos = ['test', 'test', 'test', 'test'];
    const toDoDiv = classedElement('div', ['todo-holder']);
    for (let todo of todos) {
        const div = classedElement('div', ['card']);
        div.textContent = todo;
        toDoDiv.appendChild(div);
    }

    appendChildren(document.body, [
        makeModal(),
        makeLogo(), 
        makeDropDown(), 
        makeSidebar(), 
        toDoDiv
    ]);
})();

export {
    showSideBar,
    updateProjSideBar,
    toggleModal,
    getAddProjForm 
}