import React from 'react';

import { Link } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Container } from 'react-grid-system';
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../util/wrappers.js'

import {
  blue500, blue700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const customTheme = {
  // spacing: spacing,
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blue500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};

import {
  AppBar,
  Drawer,
  IconButton,
  IconMenu,
  MenuItem
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

    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <Link to='/admin'><MenuItem>Admin Dashboard</MenuItem></Link>
        <Link to='/faucet/create'><MenuItem>Create Faucet</MenuItem></Link>
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <Link to='/login'><MenuItem>Login</MenuItem></Link>
      </span>
    )

    const SmartMenu = () => {
        return (<IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          iconStyle={{ fill: 'rgba(255, 255, 255, 1.00)' }}
        >
          <MenuItem primaryText="Source" target="_blank" href="https://github.com/transmute-industries/eth-faucet" />
          <OnlyAuthLinks />
          <OnlyGuestLinks />
        </IconMenu>)
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
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
              this.props.web3 && this.props.web3.defaultAddress && <SmartMenu />
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
