import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Faucet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
        };
    }

    handleSendWei = () => {
        this.props.onSendWeiFormSubmit(this.props.faucet.selected.address, this.state.address);
    }

    onInputChange(event) {
        this.setState({
            address: event.target.value
        });
    }

    render() {
        return (
            <div>
                <TextField
                    id="text-field-controlled"
                    floatingLabelText="Address"
                    value={this.state.address}
                    errorText={this.state.error}
                    onChange={e => this.onInputChange(e)}
                />
                <br />
                <RaisedButton onClick={this.handleSendWei} label="Request 1 Ether" />
            </div>
        );
    }
}
