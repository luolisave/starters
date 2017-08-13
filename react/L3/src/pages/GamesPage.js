import React from 'react';
import GamesList from './GamesList'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {initGame, selectGame} from '../actions/games'

class GamesPage extends React.Component {
  constructor(){
    super();
    console.log("GamesPage constructor.");
  }
  componentDidMount(){
      let self = this;
      fetch("/mockdata/games.json") // Call the fetch function passing the url of the API as a parameter
      .then(function(rs) {
        console.log("fetch rs = ", rs);
        rs.json().then(function(jsonData){
          console.log("jsonData", jsonData);
          self.props.initGame(jsonData);
        })
        // Your code for handling the data you get from the API
      })

      .catch(function() {
          // This is where you run code if the server returns any errors
      });

  }
  render() {
    return (
      <div>
        <h1>Games List</h1>

        <a className="btn btn-primary" onClick={() => this.props.selectGame({"title":"super mario"})}>click me</a>

        <GamesList games={this.props.games} />
      </div>
    );
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired
}


function mapStateToProps(state) {
  return {
    games: state.games
  }
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators(
      {
        initGame:initGame,
        selectGame: selectGame
      },
      dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(GamesPage);
//export default GamesPage;
