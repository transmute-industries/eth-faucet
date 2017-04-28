import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import classes from './CreateFaucetForm.scss'


export default class CreateFaucetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            faucetName: ''
        };
    }

    handleCreateFaucet = () => {
        let cleanName = this.state.faucetName.toLowerCase().replace(/\s+/g, "-");
    
        this.props.onCreateFaucetSubmit({
            name: cleanName,
            fromAddress: this.props.faucet.defaultAddress
        });
    }

    onInputChange(event) {
        var errorText = /^[a-zA-Z\s]*$/.test(event.target.value) ? "" : "Invalid name, please only use letters and spaces"
        this.setState({
            error: errorText,
            faucetName: event.target.value
        });
    }

    render() {
        return (
            <div className={classes.container} >
                <TextField
                    style={{width: '100%'}}
                    id="text-field-controlled"
                    floatingLabelText="Name"
                    value={this.state.faucetName}
                    errorText={this.state.error}
                    onChange={e => this.onInputChange(e)}
                />
              
                <RaisedButton className={classes.submit} onClick={this.handleCreateFaucet} disabled={this.state.error.length > 0 || this.state.faucetName.trim().length == 0} label="Create" />
               
            </div>
        );
    }
}
