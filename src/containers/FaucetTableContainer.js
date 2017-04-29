import { connect } from 'react-redux'
import FaucetTable from 'components/FaucetTable'

import { browserHistory } from 'react-router'

const mapStateToProps = (state, ownProps) => {
  return {
    faucetObjects: state.faucet.objects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRow: (rowData) => {
      event.preventDefault()
      // console.info('selected: ', rowData);
      browserHistory.push("/faucets/" + rowData.name)
    }
  }
}

const FaucetTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FaucetTable)

export default FaucetTableContainer
