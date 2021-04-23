"use strit";
import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom";

export class Search extends React.Component {
  render() {
    return <div className="search-text">This is the Search Page</div>;
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
