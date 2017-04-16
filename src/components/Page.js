import React from 'react';

import { Link } from 'react-router'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Container } from 'react-grid-system';

import { HiddenOnlyAuth, VisibleOnlyAuth } from '../util/wrappers.js'

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
        <Link to='dashboard'><MenuItem>Dashboard</MenuItem></Link>
        <Link to='profile'><MenuItem>Profile</MenuItem></Link>
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <Link to='signup'><MenuItem>Signup</MenuItem></Link>
      </span>
    )

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div style={{
          fontFamily: "'Roboto', sans-serif"
        }}>
          <AppBar
            title="The Austin Ethereum Faucet"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
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