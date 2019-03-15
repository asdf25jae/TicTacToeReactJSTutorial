import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* 
class Square extends React.Component {

  render() {
    return (
      <button className="square" 
      onClick={ () => this.props.onClick() }> 
        { this.props.value } 
      </button>
    );
  }
}
*/ 

function Square(props) { 
    return ( 
        <button className = "square" onClick = {props.onClick}>
            {props.value}
        </button>
    );
}


// replace square class with a function component 
// pure component, a function component is a simpler way to write a component with just 
// a render method and don't have their own state 

// render function returns square which on click, returns the props (the board)'s onClick function 
// defined in renderSquare in Board
// this.props.value in render() returns the props (super class or board)'s value that should be returned 


class Board extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = { 
            squares: Array(9).fill(null), // empty array of size 9 
            xIsNext: true,
        };
    }

  handleClick(i) { 
    const squares = this.state.squares.slice();
    const winner = calculateWinner(squares); 

    if (winner) { return; }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // if this.state.xIsNext true, 'X', if false, 'O'
    this.setState({
        squares : squares, 
        xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square value = { this.state.squares[i]}
                    onClick = { () => this.handleClick(i)} 
            />;
  }

  // Board's render function 
  render() {
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const winner = calculateWinner(this.state.squares); 
    let status; // init status to empty variable 
    if (winner) { 
        status = "Winner: " + winner; 
    } else { 
        status = "Next player: " + (this.state.xIsNext ? "X" : "O"); 
    }

    return ( 
      <div>
        <div className="status">{status}</div> 
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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) { 
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
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) { 
            return squares[a]; 
        }
    }
    return null; 
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
