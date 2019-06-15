import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

//framework
import Drawer from '@material-ui/core/Drawer';

//style
import styles from './top-menu-style'

//component(s)
import MenuDetail from './Menu-Detail/'

//menu configuration
import menus from './menu-configuration'

export default class index extends Component {
  state = {
    newArrival: false,
    mens: false,
    women: false,
    kids: false
  }

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open
    })
  }

  closeDrawer = (side, close) => {
    this.setState({
      [side]: false
    })    
  }

  render() {
    return (
      <div>
        <Grid container justify='center' spacing={5} >
          <Grid item  style={styles.items} onClick={ () => {this.toggleDrawer('newArrival', true)} } >
            <p>new arrival</p>
            <Drawer open={this.state.newArrival} onClose={() => {this.closeDrawer('newArrival', false)}}>
              <MenuDetail open={this.state.newArrival} topSide={menus.newArrival.header} />
            </Drawer>
          </Grid>
          <Grid item  style={styles.items} onClick={ () => {this.toggleDrawer('mens', true)} }>
            <p>mens</p>
            <Drawer open={this.state.mens} onClose={() => {this.closeDrawer('mens', false)}}>
              <MenuDetail open={this.state.mens} topSide={menus.mens.header} />
            </Drawer>
          </Grid>
          <Grid item  style={styles.items} onClick={ () => {this.toggleDrawer('women', true)} }>
            <p style={styles.items}>women</p>
              <Drawer open={this.state.women} onClose={() => {this.closeDrawer('women', false)}}>
                <MenuDetail open={this.state.women} topSide={menus.women.header} />
              </Drawer>
          </Grid>
          <Grid item  style={styles.items} onClick={ () => {this.toggleDrawer('kids', true)} }>
            <p style={styles.items}>kids</p>
              <Drawer open={this.state.kids} onClose={() => {this.closeDrawer('kids', false)}}>
                <MenuDetail open={this.state.kids} topSide={menus.kids.header} />
              </Drawer>            
          </Grid>
        </Grid>        
      </div>
    )
  }
}
