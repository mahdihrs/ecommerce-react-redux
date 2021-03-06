import React from 'react';
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  brand: {
    color: '#fff',
    textDecoration: 'none'
  }
}));

function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            {/* <MenuIcon /> */}
            <Link to={'/shop'}>
              Shop 
            </Link>
          </IconButton>
          {/* <Typography variant="h6" className={classes.title}>
          </Typography> */}
          <Typography variant="h6" className={classes.title}>
            <Link to={`/`} className={classes.brand}>
              Marche
            </Link>
          </Typography>
          <Link className={classes.brand} to={`/login`}>
            <Button color="inherit">
              Login
            </Button>
          </Link>
          {/* <Link to={`/`}> */}
            <Button>
              {/* ehe */}
              <img src="https://img.icons8.com/ios/50/000000/shopping-cart.png" width="3%" alt="trolley-icons" />
            </Button>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
