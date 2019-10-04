import React, { useState, useEffect } from 'react'

//framework
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

// redux
import { connect } from 'react-redux';
import { fetchProductsOnShopPage } from '../../store/actions/ShopPage';

// components
import ProductList from '../../components/ProductsAtMainPage/ProductsAtMainPage'
import SideMenu from '../../components/ShopComponents/SideMenu';

//styles
import useStyles from './Shop.styles';

import dummies from '../../components/ProductsAtMainPage/dummy-products'

function Shop({
  products,
  fetchProductsOnShopPage
}) {
  const classes = useStyles();
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsOnShopPage()
  }, [fetchProductsOnShopPage])
  console.log(products, '12345')

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
          <Grid item className={classes.shopSideBar} xs={2}>
            <SideMenu />
          </Grid>
          <Grid container item justify="flex-start" xs={10}>
            {products.map((product, i) => {
              return (
                <Grid item key={i} xs={3} className={classes.productContainer}>
                  <ProductList products={product} width={260} height={350} contentHeight="200" />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.shopPage.allProducts
})

const mapDispatchToProps = (dispatch) => ({
  fetchProductsOnShopPage: () => dispatch(fetchProductsOnShopPage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
