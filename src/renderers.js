import { classedElement, appendChildren } from "./template";

const toggleModal = () => document.querySelector('.modal').classList.toggle('modal-visible');

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

// (() => {
    // todo div
    // const todos = ['test', 'test', 'test', 'test'];

    // for (let todo of todos) {
    //     const div = classedElement('div', ['card']);
    //     div.textContent = todo;
    //     document.querySelector('#cardarea').appendChild(div);
    // }

// })();

export {
    updateProjSideBar,
    toggleModal
}