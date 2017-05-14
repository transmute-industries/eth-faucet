import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'

class SnackbarNotification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '0x0',
      open: false
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  componentDidUpdate (prevProps, prevState) {
    var msg = this.props.transaction.tx

    if (this.props.transaction.tx !== null && prevState.message !== msg) {
      this.setState({
        message: msg,
        open: true
      })
    }
  }

  render () {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // loans: state.loans,
    // accounts: state.accounts,
    // transaction: state.transaction
  }
}

export default connect(mapStateToProps, {})(SnackbarNotification)
