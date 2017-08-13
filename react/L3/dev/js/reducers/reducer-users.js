function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export default function (state, action) {
    console.log("a ======== action.type",action.type, "action.payload =", action.payload);
    
    switch (action.type) {
        case 'USERS_REDUCER':
            console.log("b ======== return new payload!", action.payload);
            return action.payload;
            break;
        case 'HAS_MORE_CHILD_SELECTED':
            let newUsers;
            console.log("c ======== return new payload!", action.payload);
            newUsers = clone(state);
            newUsers.push({"first":"new","last":"new", "saved":"NO", "moreChild":"NO"});
            return newUsers;
            break;
        case 'DEL_CHILD_SELECTED':
            let index = action.payload;
            let newChildren;
            // newChildren = clone(state);
            // newChildren.splice( index, 1 );
            newChildren = [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
            console.log("!!!!!!!!! newChildren", newChildren);
            return newChildren;
            break;
        default: 
            return [
                {
                    first: "",
                    last: "",
                    saved:"NO"
                }
            ];
            break;
    }
}
