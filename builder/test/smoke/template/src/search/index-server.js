"use strit";

// require("./index.scss");
const React = require("react");
const LPImage = require("../assets/linkin_park_logo.png");
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null,
    };
  }

  handleTextClick() {
    import("./dynamic").then(({ Dynamic }) => {
      console.log(Dynamic, "this is dynamic imports");
      this.setState({ Text: Dynamic });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div className="search-text">
        <span className="text" onClick={this.handleTextClick.bind(this)}>
          This is the Search Page.
          {Text && <Text />}
          <img src={LPImage} />
        </span>
      </div>
    );
  }
}
module.exports = <Search />;
