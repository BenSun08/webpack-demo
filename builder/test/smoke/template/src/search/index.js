"use strit";

import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import LPImage from "../assets/linkin_park_logo.png";
export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null,
    };
  }

  handleTextClick() {
    import("./dynamic").then(({ Dynamic }) => {
      this.setState({ Text: Dynamic });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div className="search-text">
        <span onClick={this.handleTextClick.bind(this)}>
          This is the Search Page.
          {Text && <Text />}
        </span>
        <img src={LPImage} />
      </div>
    );
  }
}

ReactDOM.hydrate(<Search />, document.getElementById("root"));
