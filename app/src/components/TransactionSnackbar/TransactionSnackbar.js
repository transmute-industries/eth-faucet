import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class TransactionSnackbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '0x0',
            open: false
        };
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        var lastTx = this.props.loan.transactions[this.props.loan.transactions.length - 1];
        if (lastTx) {
            var msg = lastTx.tx || lastTx.address;
            if (prevState.message !== msg) {
                this.setState({
                    message: msg,
                    open: true,
                });
            }
        }
    }

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}
