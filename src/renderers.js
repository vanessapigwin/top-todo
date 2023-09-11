
const classedElement = (tag, cls) => {
    const element = document.createElement(tag);
    element.classList.add(...cls)
    return element
}

const appendChildren = (parent, ...children) => {
    children.forEach(child => parent.appendChild(child))
}

const showSideBar = () => {
    document.querySelector('.proj-list').classList.toggle('visible');
}

export {
    classedElement,
    appendChildren,
    showSideBar,
}