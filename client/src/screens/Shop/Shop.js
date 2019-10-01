import React, { useState, useEffect } from 'react'

//framework
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

// components
import ProductList from '../../components/ProductsAtMainPage/ProductsAtMainPage'

//server
import server from '../../api'

//styles
import useStyles from './Shop.styles';

import dummies from '../../components/ProductsAtMainPage/dummy-products'

let gridOnShopPage;

if (dummies.length % 2 === 1) {
  dummies.length < 5 ? gridOnShopPage = 6 : gridOnShopPage = 4
} else {
  dummies.length < 5 ? gridOnShopPage = 6 : gridOnShopPage = 3
}

function Shop() {
  const classes = useStyles();
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    // server({
    //   url: `/products`,
    //   method: 'get'
    // })
    // .then(({data}) => {
    //   setProducts(data)
    //   console.log(data)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
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
      <Container maxWidth="xl">
        <Grid container justify="flex-start" style={{ marginTop: 40, height: '100vh' }}>
          <Grid item className={classes.shopSideBar} lg={2}>
            <p>123132</p>
          </Grid>
          <Grid container item justify="space-evenly" lg={10}>
            {dummies.map((e, i) => {
              return (
                <Grid item key={i} lg={3} className={classes.productContainer}>
                  <ProductList products={e} width={260} height={350} contentHeight="200" />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Shop;
