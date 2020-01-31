import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
	state = {
		history: [
			{
				squares: Array(9).fill(null)
			}
		],
		stepNumber: 0,
		xIsNext: true,
		ascending: true
	}

	handleClick(i) {
		const locations = [[1, 1],[2, 1],[3, 1],[1, 2],[2, 2],[3, 2],[1, 3],[2, 3],[3, 3]];
		const { xIsNext, stepNumber } = this.state;
		const history = this.state.history.slice(0, stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		// or: const squares = { ...this.state.squares };
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? 'X' : 'O';
		this.setState({ 
			history: history.concat([{ squares, location: locations[i]  }]),
			stepNumber: history.length,
			xIsNext: !xIsNext
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: step % 2 === 0
		});
	}

	handleDescending = () => {
		const descending = !this.state.ascending
		this.setState({ ascending: descending })
		console.log(this.state.ascending)
	}

	render() {
		const { history, xIsNext, stepNumber } = this.state;
		const current = history[stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ?
				('Go to move #' + move + ' (' + history[move].location) + ')' : 'Go to game start';
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{ move === stepNumber ? <b>{desc}</b> : desc }
					</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = 'Winner is ' + winner.player;
		} else if (!current.squares.includes(null)) {
			status = 'No winner.';
		}	else {
			status = 'Next player: ' + (xIsNext ? 'X' : 'O');
		}
		
		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
						winCombination={winner ? winner.combination : []}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
				<ol>{ this.state.ascending ? moves : moves.reverse() }</ol>
				<button onClick={this.handleDescending}>
					{ this.state.ascending ? "descending" : "ascending" } order
				</button>
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
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return { player: squares[a], combination: [a, b, c] };
		}
	}
	return null;
}


export default Game;