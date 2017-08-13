// functions, should put to seperate file later.
function clone(obj) {
    if (null === obj || "object" !== typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export default function children(state = [], action = {}){
  switch(action.type){
    case 'CHILDREN_INIT':
      console.log("children reducer: CHILDREN_INIT. action.payload = ", action.payload);
      return action.payload;
    case 'SAVE_CHILD':
      console.log("children reducer: SAVE_CHILD. action.payload = ", action.payload);
      action.payload.saved = true;
      console.log("!!! state = ",state);
      console.log("!!! payload = ",action.payload);
      for(var i = 0; i< state.length; i++){
        if(state[i]._id === action.payload._id){
          console.log("!!! find a match! _id = ", action.payload._id);
          state[i] = action.payload;
        }
      }
      let newState = clone(state);
      console.log("!!! replace old state with new one (most likely update the last item). state=", state);
      return newState;
      //return [action.payload];
    case 'REMOVE_CHILD':
      console.log("children reducer: REMOVE_CHILD. action.payload = ", action.payload);
      action.payload.saved = true;
      console.log("!!! state = ",state);
      console.log("!!! payload = ",action.payload);
      let newChildren;
      for(var i = 0; i< state.length; i++){
        if(state[i]._id === action.payload._id){
          console.log("!!! find a match! _id = ", action.payload._id);
          state[i] = action.payload;
          newChildren = [
                ...state.slice(0, i),
                ...state.slice(i + 1)
            ];
        }
      }
      console.log("!!! replace old state with new one (most likely update the last item). state=", state);
      return newChildren;
    case 'ADD_NEW_CHILD':
        console.log("children reducer: ADD_NEW_CHILD. action.payload = ", action.payload);
        state.push(action.payload);
        return state;
    default:
      console.log("children reducer: default");
      return state;
      // return [
      //   {"_id": 1, "first":"Joe", "last":"Luo", "saved":false},
      //   {"_id": 2, "first":"Ke", "last":"Luo", "saved":false},
      //   {"_id": 3, "first":"Wea", "last":"Luo", "saved":false},
      //   {"_id": 4, "first":"Appeaew", "last":"Luo", "saved":true},
      // ];
  }
}
