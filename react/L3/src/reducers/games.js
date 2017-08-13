export default function games(state = [], action = {}){
  switch(action.type){
    case 'GAMESPAGE_INIT':
      console.log("games reducer: GAME_INIT. action.payload = ", action.payload);

      return action.payload;
    default:
      console.log("games reducer: default");
      return state;
  }
}
