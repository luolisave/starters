export const initGame = (payload) => {
    console.log("action: Should call api and get gamelist from RESTFUL api.");
    return {
        type: 'GAMESPAGE_INIT',
        payload: payload
    }
};

export const selectGame = (game) => {
    console.log("You clicked on game: ", game);
    return {
        type: 'GAME_SELECTED',
        payload: game
    }
};
