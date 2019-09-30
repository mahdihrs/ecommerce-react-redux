import React from 'react'

// framework
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const menus = ['Add Product', 'All Products']

const AdminTopMenu = (props) => {
  return ( 
    <Grid container direction="column" justify="center" spacing={24} style={props.height} >
      {menus.map((menu, index) => {
        return (
          <Grid key={index} item>
            <Button style={props.buttonSize}>{menu}</Button>
          </Grid>
        )
      })}
    </Grid>    
  );
}

export default AdminTopMenu;