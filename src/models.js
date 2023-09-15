const Priority = {
    Low: 'Low',
    Medium: 'Med',
    High: 'High',
}

const Todo = (title, description, dueDate, priority) => {
    return {title, description, dueDate, priority}
}

export {Priority, Todo}