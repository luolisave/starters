import { combineReducers } from 'redux';

import games from './reducers/games';
import children from './reducers/children';

export default combineReducers({
  games:games,
  children:children
});
