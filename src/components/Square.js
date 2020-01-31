import React from 'react';

function Square(props) {
	return (
		<button 
			className={props.winCombination ? "square winning" :"square"}
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

export default Square;