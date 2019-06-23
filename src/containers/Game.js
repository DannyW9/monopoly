import React, {Component, useState}  from 'react';
import Board from '../containers/Board';
import Player from '../models/Player';
import PlayerStatus from '../components/PlayerStatus';
import conditionalButtonsLogic from '../helpers/ConditionalButtonsLogic'

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      chanceCards: [],
      chestCards: [],
      rolled: false,
      won: false,
      moveValue: null,
      doubleCount: 0,
      activePlayer: null,
      activePlayerIndex: null,
      players: []
    }

    this.setMoveValue = this.setMoveValue.bind(this);
    this.updateRolled = this.updateRolled.bind(this);
    this.updateDoubleCount = this.updateDoubleCount.bind(this);
    this.updatePlayerPosition = this.updatePlayerPosition.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.updateActivePlayer = this.updateActivePlayer.bind(this);
  }

  startNewGame(){
    // this.setState({
    //   players: []
    // })

    this.state.players.push(new Player('Danny', 'red'))
    this.state.players.push(new Player('Lindsey', 'orange'))

    this.setState({
      moveValue: null,
      activePlayer: this.state.players[0],
      activePlayerIndex: 0,
      won: false
    })
  }

    setMoveValue(newValue){
      this.setState({moveValue: newValue})
    }

    updateRolled(){
      this.setState({rolled: true})
    }

    updateDoubleCount(newValue){
      this.setState({doubleCount: this.state.doubleCount + newValue})
    }

    // Double will be used to check if the player can leave jail once implemented
    updatePlayerPosition(moveValue, double){
      this.state.activePlayer.updatePosition(moveValue)
    }

    updateActivePlayer(){
      if(this.state.rolled){
        const newIndex = (this.state.activePlayerIndex +1) % (this.state.players.length)
        this.setState({
          activePlayer: this.state.players[newIndex],
          activePlayerIndex: newIndex,
          moveValue: null,
          rolled: false
         })
      }
    }





render(){

const state = this.state;

let newGameButton = conditionalButtonsLogic.checkIfCurrentGame(state.players.length, this.startNewGame);

  return(
    <div>
      <Board
        squares={state.squares}
        moveValue={state.moveValue}
        rolled={state.rolled}
        won={state.won}
        doubleCount={state.doubleCount}
        setMoveValue={this.setMoveValue}
        updateRolled={this.updateRolled}
        updateDoubleCount={this.updateDoubleCount}
        updatePlayerPosition={this.updatePlayerPosition}
        updateActivePlayer={this.updateActivePlayer}
        players={state.players}
        />
      {newGameButton}
      <PlayerStatus
        players={state.players}
        activePlayer={state.activePlayer}
      />
    </div>
  )
}

}

export default Game;
