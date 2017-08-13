function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export const selectUser = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};

export const selectHasChild = (child) => {
    console.log("You clicked on has child: ", child);
    return {
        type: 'HAS_CHILD_SELECTED',
        payload: child
    }
};

export const selectHasMoreChild = (child) => {
    child.moreChild = "YES";
    console.log("You clicked on has more child: ", child);
    return {
        type: 'HAS_MORE_CHILD_SELECTED',
        payload: child
    }
};


export const typeInputBox = (event, firstOrLastName, keyIndex, users) => {
    console.log("1=== typeInputBox:  ", event, keyIndex, users);
    console.log("2=== event.target.value", event.target.value);
    console.log("3=== users[keyIndex] ", users[keyIndex]);
    console.log("4=== event.target.value ", event.target.value);

    users[keyIndex].saved = "NO";
    if(firstOrLastName === "first"){
        users[keyIndex].first = event.target.value;
    }else if(firstOrLastName === "last"){
        users[keyIndex].last = event.target.value;
    }

    return {
        type: 'USERS_REDUCER',
        payload: users
    }
};

export const saveChild = (event, keyIndex, users) => {
    users[keyIndex].saved = "YES";
    console.log("10=== users[keyIndex] ", users[keyIndex]);
    let newUsers = clone(users);
    return {
        type: 'USERS_REDUCER',
        payload: newUsers
    }
};

export const removeChild = (event, keyIndex, users) => {
    return {
        type: 'DEL_CHILD_SELECTED',
        payload: keyIndex
    }
};