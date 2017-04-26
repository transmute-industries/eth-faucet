import React, { Component } from 'react'

import PageContainer from '../containers/PageContainer';
import LoginContainer from '../containers/LoginContainer';

class LoginPage extends Component {
  render() {
    return(
      <PageContainer>
        <LoginContainer />
      </PageContainer>
    )
  }
}

export default LoginPage
