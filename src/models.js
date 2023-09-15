import { compareAsc, format } from 'date-fns'

const Priority = {
    Low: 'Low',
    Medium: 'Med',
    High: 'High',
}

const Todo = (title, description, dueDate, priority, isDone) => {

    return {title, description, dueDate, priority, isDone}
}

export {Priority, Todo}