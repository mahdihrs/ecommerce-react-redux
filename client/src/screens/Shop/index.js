import React, { useState, useEffect } from 'react'

//framework
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// components
import ProductList from '../../components/ProductsAtMainPage'

//server
import server from '../../api'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30%'//300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function Shop () {
  const classes = useStyles();
  const [ products, setProducts ] = useState([]) 

  useEffect( () => {
    server({
      url: `/products`,
      method: 'get'
    })
    .then(({data}) => {
      setProducts(data)
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Find Products"
          className={classes.textField}
          margin="normal"
        />
      </form>
      <Grid container spacing={1} justify="space-evenly" style={{marginTop: 40}}>
        {products.map(e => {
          return (
            <div key={e._id}>
              {/* <img src={e.image} /> */}
              {/* <p>{e.description}</p> */}
              <Grid item>
                <ProductList products={e} maxWidth={225} height={350} contentHeight="200" />
                </Grid>
            </div>
          )
        })}        
      </Grid>
    </div>
  )
}

export default Shop
