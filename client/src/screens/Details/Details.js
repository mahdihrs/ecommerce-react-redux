import React, { useState, useEffect } from 'react'

import {
  SideBySideMagnifier
} from "react-image-magnifiers";

//framework
import Grid from '@material-ui/core/Grid';

// redux
import { connect } from 'react-redux';
import { fetchDetailProduct } from '../../store/actions/DetailPage';

function Details({
  prod,
  fetchProductsOnShopPage,
  loading,
  ...props
}) {

  useEffect(() => {
    // setProd(dummyProd[3])
    fetchProductsOnShopPage(props.match.params.id)
  }, [fetchProductsOnShopPage, props.match.params.id])
  console.log(prod, 'prod')

  return (
    <div>
      <h2>{prod.name}</h2>
      {loading ?
        <h1>Loading</h1>
        :
        <Grid container direction="row" spacing={8} style={{ width: '100%' }} justify="space-around">
          <Grid item lg={5} >
            <SideBySideMagnifier
              imageSrc={prod.image}
              imageAlt={prod.name}
              alwaysInPlace={true}
              overlayOpacity={0.6}
            />
          </Grid>
          <Grid item lg={6}>
            <h4>Description</h4>
            <p>{prod.name}</p>
            <p>{prod.description}</p>
          </Grid>
        </Grid>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.detailPage.loading,
  prod: state.detailPage.productToShow
})

const mapDispatchToProps = (dispatch) => ({
  fetchProductsOnShopPage: (id) => dispatch(fetchDetailProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Details);
