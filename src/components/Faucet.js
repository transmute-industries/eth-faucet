import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';

export default class Faucet extends React.Component {

    constructor(props) {
        console.log("props: ", props.faucet);
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
            <Card>
              {this.props.faucet.selected &&
                <CardTitle
                  title={window.location.pathname.split('/').pop() + " Faucet"} style={{"textTransform":"capitalize"}}
                  subtitle={"Balance: " + this.props.faucet.selected.balance + " Ether" }
                />
              }
              <CardText>
                  <TextField
                      id="text-field-controlled"
                      floatingLabelText="Address"
                      value={this.state.address}
                      errorText={this.state.error}
                      onChange={e => this.onInputChange(e)}
                  />
                  <br />
                  <RaisedButton onClick={this.handleSendWei} label="Request 1 Ether" />
              </CardText>
            </Card>
        );
    }
}
