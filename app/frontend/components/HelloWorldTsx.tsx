import React from "react"

class HelloWorld extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greeting: { this.props.greeting }
      </React.Fragment>
    );
  }
}

export default HelloWorld
