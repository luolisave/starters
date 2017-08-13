export default function (state = {}, action) {
    switch (action.type) {
        case 'HAS_CHILD_SELECTED':
            state.hasChild = action.payload;
            break;
    }
    return state;
}
