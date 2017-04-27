import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class CreateFaucet extends React.Component {

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
            <div>
                <TextField
                    id="text-field-controlled"
                    floatingLabelText="Name"
                    value={this.state.faucetName}
                    errorText={this.state.error}
                    onChange={e => this.onInputChange(e)}
                />
                <br />
                <RaisedButton onClick={this.handleCreateFaucet} disabled={this.state.error.length > 0 || this.state.faucetName.trim().length == 0} label="Create" />
            </div>
        );
    }
}
