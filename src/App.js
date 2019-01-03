import React, { Component } from "react";
import "./App.css";
import Cell from "./components/Cell";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Array(9).fill(null),
      msg: [],
      player: 1
    };
  }
  toggleValue(index) {
    const values = this.state.values.slice();
    let curValue = values[index];
    const playerTurn = this.state.player;
    const playMsg = "Player " + (playerTurn + 1) + " turn.";
    const playerSymbol = playerTurn ? "X" : "O";
    switch (curValue) {
      case null:
        curValue = playerSymbol;
        this.setState(prevState => ({
          msg: [...prevState.msg, "Setting value to " + playerSymbol, playMsg],
          player: !playerTurn
        }));
        break;
      case "X":
        curValue = null;
        break;
      case "O":
        curValue = null;
        break;
      default:
        break;
    }

    values[index] = curValue;
    this.setState({ values: values });
    if (this.calculateWinner(values)) {
      this.setState(prevState => ({
        msg: [
          ...prevState.msg,
          "Player " + (playerTurn ? "1" : "2") + " has WON the game!!!!"
        ]
      }));
    }
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  renderCell(index) {
    return (
      <Cell
        value={this.state.values[index]}
        action={() => this.toggleValue(index)}
      />
    );
  }

  renderMessage() {
    return this.state.msg.map(text => <div>{text}</div>);
  }
  render() {
    return (
      <div className="App">
        <h3>Tic Tac Toe</h3>

        <div className="wrapper">
          <div className="row">
            {this.renderCell(0)}
            {this.renderCell(1)}
            {this.renderCell(2)}
          </div>
          <div className="row">
            {this.renderCell(3)}
            {this.renderCell(4)}
            {this.renderCell(5)}
          </div>
          <div className="row">
            {this.renderCell(6)}
            {this.renderCell(7)}
            {this.renderCell(8)}
          </div>
        </div>
        <div className="messages">{this.renderMessage()}</div>
      </div>
    );
  }
}

export default App;
