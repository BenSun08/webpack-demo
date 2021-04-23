"use strit";
import "./styles/index.scss";
import LPImage from "./assets/5b4e55e250536a1b1d619bef1998b279.png";
import React from "react";
import ReactDOM from "react-dom";

export class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        This is the Search Page. I love Linkin Park
        <img src={LPImage}></img>
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
