import React, { Component } from 'react'
import PropTypes from 'prop-types';

//framework
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';

//style
import styles from './MenuDetail.styles'

export default class MenuDetail extends Component {
  // state = {
  //   left: this.props.open,
  // }

  render() {
    // const { left } = this.state
    const { topSide, bottomSide } = this.props

    return (
      // <Drawer open={this.props.open} onClose={this.props.close}>
        <div style={styles.fullList}>
          {/* {alert(JSON.stringify(this.props))} */}
          <List>
            {topSide.map((text, index) => (
              <ListItem button key={text}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
            // {bottomSide.map((text, index) => (
              <ListItem button key={text}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      // </Drawer>
    )
  }
}
