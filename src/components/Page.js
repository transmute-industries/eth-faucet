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
  MenuItem,
  AvatarIcon
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

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

    // needed for VisibleOnlyAuth & HiddenOnlyAuth
    const { user } = this.props
    // kindof a code smell?

    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <Link to='admin'><MenuItem>Admin Dashboard</MenuItem></Link>
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <Link to='faucet/create'><MenuItem>Create Faucet</MenuItem></Link>
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

              <IconMenu
                iconButtonElement={
                  <IconButton>
                    {
                      user === null ? <AvatarIcon /> : <MoreVertIcon />
                    }
                  </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="Source" target="_blank" href="https://github.com/transmute-industries/eth-faucet" />

                <OnlyAuthLinks />
                <OnlyGuestLinks />

              </IconMenu>

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