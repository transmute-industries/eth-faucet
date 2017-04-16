import React from 'react';

import { Link } from 'react-router'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Container } from 'react-grid-system';
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../util/wrappers.js'

import {
  AppBar,
  Drawer,
  IconButton,
  IconMenu,
  MenuItem
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: false,
    }
  }
  onHamburgerClick() {
    this.setState({
      navOpen: !this.state.navOpen,
    })
  }

  render() {

    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <Link to='admin'><MenuItem>Admin Dashboard</MenuItem></Link>
        <Link to='profile'><MenuItem>Profile</MenuItem></Link>
        <Link to='faucet/create'><MenuItem>Create Faucet</MenuItem></Link>
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <Link to='signup'><MenuItem>Signup</MenuItem></Link>
      </span>
    )

    const SmartMenu = () => {
      if (this.props.user.data) {
        return (<IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Source" target="_blank" href="https://github.com/transmute-industries/eth-faucet" />
          <OnlyAuthLinks />
          <OnlyGuestLinks />
        </IconMenu>)
      } else {
        return <IconButton label="login" onClick={e => this.props.loginUser()}> <ActionFlightTakeoff /> </IconButton>
      }

    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div style={{
          fontFamily: "'Roboto', sans-serif"
        }}>
          <AppBar
            title="The Austin Ethereum Faucet"

            iconElementLeft={

              <IconButton
                tooltip="Learn more about..."
                tooltipPosition="bottom-right"
                onTouchTap={this.handleToggle}
              >
                <NavigationMenu />
              </IconButton>
            }

            iconElementRight={
              <SmartMenu />
            }

            onLeftIconButtonTouchTap={e => this.onHamburgerClick()}
          />
          <Drawer open={this.state.navOpen} onRequestChange={e => this.onHamburgerClick()} docked={false}>
            <Link to='/'><MenuItem>Home</MenuItem></Link>
            <OnlyAuthLinks />
            <OnlyGuestLinks />
          </Drawer>
          <br />
          <Container>
            {this.props.children}
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default Page;