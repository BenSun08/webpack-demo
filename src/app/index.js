import React from 'react';
import ReactDOM from 'react-dom';
import { hello } from './helloworld';

function main() {
  return 'hello world';
}
main();
export class App extends React.Component {
  render() {
    return <div>{hello()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('#root'));
