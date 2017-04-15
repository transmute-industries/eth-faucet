import React, { Component } from 'react'


class Kitchen extends Component {
  constructor(props, { authData }) {
    super(props)
    console.log(this.props, authData);
  }

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Kitchen</h1>
            <strong>Hello {this.props.authData.name}!</strong>
            <button className="btn btn-default"> </button>
          </div>
        </div>  
      </main>
    )
  }
}

export default Kitchen