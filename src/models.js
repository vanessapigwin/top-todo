const Priority = {
    Low: 'Low',
    Medium: 'Med',
    High: 'High',
}

const Todo = (title, description, dueDate, priority, isDone) => {
    this.isDone = false;
    return {title, description, dueDate, priority, isDone}
}

export {Priority, Todo}