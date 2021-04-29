"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { hello } from "./helloworld";

function main() {
  console.log(hello());
}
main();
export class App extends React.Component {
  render() {
    return <div>{hello()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("#root"));
