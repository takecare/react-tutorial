import React from 'react';
import { Board } from './board.js';

class cHistory extends React.Component {

  constructor(props) {
    super(props);
    //
  }

  render() {
    return (
      <div>
        <p></p>
      </div>
    )
  }

}

export class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        current: 'x',
        winner: null
      }]
    }
  }

  restart() {
    const newState = {
      history: [{
        squares: Array(9).fill(null),
        current: 'x',
        winner: null
      }]
    }
    this.setState(newState)
  }

  determineWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  renderHistory(historyItem, index) {
    return (
      <li key={index}>
        move {index}<br/>
        {historyItem.squares.filter(item => item != null).length} squares taken<br/>
        {historyItem.current} was playing
      </li>
    )
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];

    if (current.squares[i] || current.winner) {
      return;
    }

    const squares = current.squares.slice();
    squares[i] = current.current.slice();

    const nextPlayer = current.current === 'x' ? 'o' : 'x';
    const winner = this.determineWinner(squares);

    const newHistoryEntry = Object.assign({}, current);
    newHistoryEntry.squares = squares
    newHistoryEntry.current = nextPlayer;
    newHistoryEntry.winner = winner;

    const newState = Object.assign({}, this.state)
    newState.history.push(newHistoryEntry)
    this.setState(newState);
  }

  render() {
    const current = this.state.history[this.state.history.length - 1];
    const winner = current.winner;
    const moves = this.state.history.map(this.renderHistory)

    return (
      <div className="game">
        <p><button className={winner ? 'show' : 'hide'} onClick={() => this.restart()}>restart</button></p>
        <div className="game-board">
          <Board
            squares={current.squares}
            winner={current.winner}
            player={current.current}
            handleClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{/* TODO */}</div>
            {moves}
        </div>
      </div>
    );
  }
}
