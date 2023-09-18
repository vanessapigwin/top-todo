import './style.css';
import {controller} from './controllers';

(() => {
    const currentProj = 'Default';
    controller.initProjList();
    controller.updateTaskList(currentProj);

    document.querySelector('#addproj').addEventListener('click', controller.addProj);
    document.querySelector('#addtodo').addEventListener('click', () => controller.addTodo(currentProj));
    document.querySelector('.importance').addEventListener('click', controller.filterByImportance);
    document.querySelector('.timeline').addEventListener('click', controller.filterByDate);
})();
