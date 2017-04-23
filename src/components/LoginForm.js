import React, { Component } from 'react';

import { web3 } from '../env'
let isInjected = window.web3 !== undefined;

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Container, Row, Col } from 'react-grid-system';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';

import { HiddenOnlyAuth, VisibleOnlyAuth } from '../util/wrappers.js';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      error: '',
    };
  }

  onInputChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit() {
    if (this.state.name.length < 2) {
      this.setState({
        error: 'Please fill in your name.',
      });
      return;
    }

    this.props.onLoginFormSubmit(this.state.name);
  }

  render() {

  const OnlyAuthIdentity = VisibleOnlyAuth(() =>
      <Container>
          <Row>
              <Col xs={12} md={12} lg={12} className="padded">
                  <p className="_tac">You are logged in with MetaMask </p>
              </Col>
          </Row>
      </Container>
  )

  const LoginWithMetaMask = () => {
      return (
          <div>
              <CardText className="loginCardText" >
                  <p>
                      MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser today.
                      It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.
                      <br />
                      <br />
                      {(isInjected) ? 'You are already logged in.' : 'You need to install the chrome extension.'}
                  </p>
              </CardText>
              <CardActions style={{ textAlign: 'right', paddingRight: 0}}>
                  {(!isInjected) && <RaisedButton label="Get Chrome Extension" href="https://metamask.io/" secondary={true} />}
              </CardActions>
          </div>
      );
  }

  const OnlyGuestIdentity = HiddenOnlyAuth(() =>
      <Container>
          <Row>
              <Col xs={12} md={12} lg={12} className="">
                  <LoginWithMetaMask />
              </Col>
          </Row>
      </Container>
  )

  return (
      <Container>
          <Row>
              <Col xs={12} md={12} lg={12} className="">
                  <Card className="loginCard">
                      <CardHeader
                          title={'MetaMask'}
                          subtitle={'Google Chrome'}
                          avatar={'metamask.png'}
                          actAsExpander={false}
                          showExpandableButton={false}
                      />
                      <OnlyGuestIdentity />
                      <OnlyAuthIdentity />
                  </Card>
              </Col>
          </Row>
      </Container>
  );
  }
}

export default LoginForm;
