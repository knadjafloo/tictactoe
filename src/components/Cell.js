import React, { Component } from "react";

class Cell extends Component {
  render() {
    return (
      <div className="cell" onClick={this.props.action}>
        {this.props.value}
      </div>
    );
  }
}

export default Cell;
