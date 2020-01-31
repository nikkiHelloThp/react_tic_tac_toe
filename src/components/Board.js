import React, { Component, Fragment } from 'react';
import Square from './Square';

class Board extends Component {
	renderSquare(i) {
		return (
			<Square
				key={i}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
				winCombination={this.props.winCombination.includes(i)}
			/>
		);
	}
	
	render() {
		const board = [0, 1, 2]
			.map(row => {
				return (
					<div
						key={row}
						className="board-row"
					>
						{
							[0, 1, 2].map(square => {
								let number = ((3 * square) / 3) + 3 * row;
								return this.renderSquare(number)
							})
						}
					</div>
				)
			});
	
		return (
			<Fragment>
				{board}
			</Fragment>
		)
	}
}

export default Board;