import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Faucet extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         faucetName: '',
    //         expanded: true,
    //     };
    // }

    render() {
        return (

            <div>
              {this.props.faucet.selected}
            </div>

        );
    }
}
