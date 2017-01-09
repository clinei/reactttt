import React from "react";

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
	}
	render() {
		return (
			<div>
				<div className="status">{this.props.status}</div>
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
	constructor() {
		super();
		this.state = {
			history: [{
				squares: Array(9).fill(null)
			}],
			xNext: true,
			iMoveCurr: 0
		};
	}
	get currentState() {
		return this.state.history[this.state.iMoveCurr];
	}
	get next() {
		return this.state.xNext ? "X" : "O";
	}
	winner() {
		const squares = this.currentState.squares;
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
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.iMoveCurr + 1);
		const squares = this.currentState.squares.slice();
		if (squares[i] !== null) {
			return;
		}
		const winner = this.winner();
		if (winner !== null) {
			return;
		}
		squares[i] = this.next;
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			xNext: !this.state.xNext,
			iMoveCurr: this.state.iMoveCurr + 1
		});
	}
	jumpTo(iMove) {
		this.setState({
			iMoveCurr: iMove,
			xNext: iMove % 2 ? false : true
		});
	}
	render() {
		let status;
		const winner = this.winner();
		if (winner) {
			status = "Winner: "+ winner;
		} else {
			status = "Next: "+ this.next;
		}

		const history = this.state.history;
		const moves = history.map((move, iMove) => {
			const desc = iMove >= 1 ? "Move #"+ iMove : "Start";
			return (
				<li key={iMove}>
					<a href="#" onClick={() => this.jumpTo(iMove)}>{desc}</a>
				</li>
			);
		});
		return (
			<div className="game">
				<div className="game-board">
					<Board status={status} squares={this.currentState.squares} onClick={(i) => this.handleClick(i)} />
				</div>
				<ul>{moves}</ul>
			</div>
		);
	}
}

export default Game;
