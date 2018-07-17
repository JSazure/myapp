import React,{Component } from 'react'

class Loading extends Component {
  constructor(props) {
    super(props)
  }
  
  render () {
    return (
      <div className='loadingbox' style = {{display: this.props.display}}>
		<div className="bounce1"></div>
		<div className="bounce2"></div>
		<div className="bounce3"></div>
      </div>
    )
  }
}

export default Loading
