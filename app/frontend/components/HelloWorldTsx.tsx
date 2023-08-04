import React from 'react'

class HelloWorldTsx extends React.Component {
  render() {
    return <React.Fragment>Greeting: {this.props.greeting}</React.Fragment>
  }
}

export default HelloWorldTsx
