import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';

export default class Faucet extends React.Component {

    constructor(props) {
        console.log("constructor: ", props.faucet);
        super(props);
        this.state = {
            address: '',
        };
    }

    // componentWillReceiveProps(nextProps) {
    //   console.log("componentWillReceiveProps nextProps:", nextProps);
    // }

    // componentDidUpdate(prevProps, nextProps) {
    //   console.log("componentDidUpdate this.props:", this.props)
    // }

    // componentWillUpdate(prevProps, nextProps) {
    //   console.log("componentWillUpdate this.props:", this.props)
    // }

    handleSendWei = () => {
        this.props.onSendWeiFormSubmit(this.props.faucet.selected.address, this.state.address);
    }

    onInputChange(event) {
        this.setState({
            address: event.target.value
        });
    }

    render() {
        const { selected } = this.props.faucet;
        return (
            <Card>
              {selected &&
                <CardTitle
                  title={selected.name + " Faucet"} style={{"textTransform":"capitalize"}}
                  subtitle={"Balance: " + selected.balance + " Ether" }
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
