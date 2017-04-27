import React from 'react'
import { PropTypes }  from 'prop-types';
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

// import {loginUser, logoutUser} from '../User/Actions'

class UPortProfile extends React.Component {

    state = {}

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };

    handleLogout = () =>{
        logoutUser()
    }

    render() {

        const { logoutUser, loginUser } = this.props

        const OnlyAuthIdentity = VisibleOnlyAuth(() =>

                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={this.props.user.data.name}
                    subtitle={this.props.user.data['@type']}
                    avatar={'https://ipfs.infura.io' + this.props.user.data.image.contentUrl}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardMedia
                    expandable={true}
                    overlay={<CardTitle title={this.props.user.data.name} subtitle={this.props.user.data['@type']} />}
                >
                    <img src={'https://ipfs.infura.io' + this.props.user.data.image.contentUrl} />
                </CardMedia>
                <CardText expandable={true}>
                    Lean more at <a href="https://developer.uport.me" target="_blank">developer.uport.me</a>
                </CardText>
                <CardActions>
                    {/*<FlatButton label="Logout" onTouchTap={this.props.logoutUser} />*/}
                </CardActions>
            </Card>

        )

        const OnlyGuestIdentity = HiddenOnlyAuth(() =>


             <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={'Anonymous (Tracked)'}
                    subtitle={'Person'}
                    avatar={'https://i.imgur.com/l1Rc9aD.png'}
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardActions>
                  <RaisedButton onClick={() => { this.props.loginUser() }}
                    label="Login with UPort" secondary={true} />
                </CardActions>
            </Card>
        )

        return (
            <div>
            <OnlyAuthIdentity/>
            <OnlyGuestIdentity/>
            </div>
        );
    }
}

// TransferCard.propTypes = {
//     accounts: PropTypes.arrayOf(PropTypes.shape({
//         address: PropTypes.string.isRequired,
//         balance: PropTypes.object.isRequired
//     })).isRequired
// }

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(
    mapStateToProps,
    {}
)(UPortProfile)
