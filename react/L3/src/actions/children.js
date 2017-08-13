export const initChildren = (payload) => {
    console.log("action: initChildren.");
    return {
        type: 'CHILDREN_INIT',
        payload: payload
    }
};

export const addNewChild = (payload) => {
    console.log("action: add new Child.");
    return {
        type: 'ADD_NEW_CHILD',
        payload: payload
    }
};
