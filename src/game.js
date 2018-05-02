import React from 'react';
import { Board } from './board.js';
import { History } from './history.js';

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

  handleHistoryClick(index) {
    const newState = Object.assign({}, this.state)
    newState.history = this.state.history.slice(0, index + 1)
    this.setState(newState)
  }

  renderHistory(historyItem, index) {
    return (
      <History
        key={index}
        index={index}
        squares={historyItem.squares}
        current={historyItem.current}
        goTo={(index) => this.handleHistoryClick(index)}
      />
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
    const history = this.state.history
    const current = history[this.state.history.length - 1];
    const winner = current.winner;
    const moves = (history.length === 1 ? [] : history.slice(0, history.length - 1))
      // .map(this.renderHistory)
      .map((val, index) => {
        const f = this.renderHistory.bind(this)
        return f(val, index)
      })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winner={current.winner}
            player={current.current}
            handleClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{/* TODO */}</div>
          <ol>{moves}</ol>
          <p><button className={winner ? 'show' : 'hide'} onClick={() => this.restart()}>restart</button></p>
        </div>
      </div>
    );
  }
}
