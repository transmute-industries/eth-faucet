import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

export default class CreateFaucetCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  handleCreate = () => {
    console.log('create new faucet...')
  };

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="New Faucet"
          subtitle="Owner "
          avatar="water.jpg"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          {/*<FlatButton label="Create" onTouchTap={this.handleCreate} />*/}
        </CardActions>
      </Card>
    );
  }
}