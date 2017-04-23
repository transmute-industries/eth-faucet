import React, { Component } from 'react'

import PageContainer from '../containers/PageContainer';
import LoginFormContainer from '../containers/LoginFormContainer';

class Login extends Component {
  render() {
    return(
      <PageContainer>
        <LoginFormContainer />
      </PageContainer>
    )
  }
}

export default Login
