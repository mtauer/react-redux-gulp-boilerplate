import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class HelloWorld extends Component {
  render() {
    const { tick } = this.props
    return (
      <p>Hello world from ReactJS (with Redux tick state {tick})</p>
    )
  }
}
HelloWorld.PropTypes = {
  tick: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  const { tick } = state.tickState
  return {
    tick,
  }
}

export default connect(mapStateToProps)(HelloWorld)
