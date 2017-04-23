import { connect } from 'react-redux'
import Page from '../components/Page'

const mapStateToProps = (state, ownProps) => {
    return {
        web3: state.web3
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const PageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)

export default PageContainer
