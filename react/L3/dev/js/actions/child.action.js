export const childAction = (child) => {
    console.log("You clicked on child: ", child);
    return {
        type: 'HAS_CHILD',
        payload: child
    }
};
