import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class SignUpForm extends Component {
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

    this.props.onSignUpFormSubmit(this.state.name);
  }

  render() {
    return(
      <div>
        <TextField
          id="text-field-controlled"
          floatingLabelText="Name"
          value={this.state.value}
          errorText={this.state.error}
          onChange={e => this.onInputChange(e)}
        />
        <br />
        <RaisedButton label="Submit" primary={true} onTouchTap={e => this.handleSubmit()} />
      </div>
    );
  }
}

export default SignUpForm;
