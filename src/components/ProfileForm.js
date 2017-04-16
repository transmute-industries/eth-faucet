import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RadioButton from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';

const styles = {
    radioButton: {
        marginBottom: 16,
    },
    textField: {
        marginBottom: 16,
    },
    CardActions: {
        textAlign: 'right',
        paddingRight: 0
    }
};

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.data.name || '',
            authorized: this.props.user.data.authorized || false,
            error: '',
        };
    }

    handleSubmit() {
        if (this.state.name.length < 2) {
            this.setState({
                error: 'Please fill in your name.',
            });
            return;
        }
        this.props.onProfileFormSubmit(this.state.name);
    }

    render() {
        return (
            <Card>
                <CardTitle title="Profile" subtitle="Your faucet profile" />
                <CardText>
                    <TextField
                        floatingLabelText="Name"
                        floatingLabelFixed={true}
                        value={this.state.name}
                        errorText={this.state.error}
                        onChange={e => this.setState({ name: e.target.value })}
                        style={styles.textField}
                    />
                    <RadioButton
                        value={this.state.authorized}
                        label="Authorized"
                        disabled={true}
                        checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        style={styles.radioButton}
                    />
                </CardText>
                <CardActions style={styles.CardActions}>
                    <RaisedButton label="Update" primary={true} onTouchTap={e => this.handleSubmit()} />
                </CardActions>
            </Card>
        );
    }
}

export default ProfileForm;
