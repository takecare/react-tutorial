import React from 'react';
import Square from './square.js';

export class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      current: 'x',
      winner: null
    }
  }

  handleClick(i) {
    if (this.state.squares[i] || this.state.winner) {
      return;
    }

    const squares = this.state.squares.slice();
    squares[i] = this.state.current.slice();
    const current = this.state.current === 'x' ? 'o' : 'x';

    const winner = this.determineWinner(squares);

    this.setState(
      {
        squares: squares,
        current: current,
        winner: winner
      }
    );
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

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  restart() {
    console.log('RESTART');
  }

  render() {
    console.log(this.winner)
    const status = this.state.winner ? 'Winner: ' + this.state.winner : 'Next player: ' + this.state.current;
    return (
      <div>
        <div className="status">{status}</div>
        <p><button className={this.state.winner ? 'show' : 'hide'} onClick={() => this.restart()}>restart</button></p>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
