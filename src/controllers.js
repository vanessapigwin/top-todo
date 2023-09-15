// reference: MDN web docs - Using the web storage API
const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = 'best_cat';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException && (
                e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage &&
            storage.length !== 0
        );
    }
}

const storage = () => {
    const activeStorage = storageAvailable('localStorage')? localStorage: {};

    const setItem = (key, value) => activeStorage[key] = JSON.stringify(value);
    const getItem = (key) => JSON.parse(activeStorage[key]);
    const removeItem = (key) => {delete activeStorage[key]};

    const getProjects = () => {
        try {
            getItem('projects');
        } catch (e) {
            setItem('projects', [])
        }
        return getItem('projects');
    }

    const addProject = (projName) => {
        // todo: add handling of case when proj name already exists
        const projects = getProjects();
        projects.push(projName);
        setItem('projects', projects);
        setItem(projName, []);
    }

    const removeProject = (projName) => {
        setItem('projects', getProjects().filter(project => projName !== project));
        removeItem(projName);
    }
    
    return {
        activeStorage,
        setItem,
        getItem,
        removeItem,
        getProjects,
        addProject,
        removeProject
    }
}
    
export {
    storage
}