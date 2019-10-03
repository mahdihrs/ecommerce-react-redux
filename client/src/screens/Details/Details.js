import React, { useState, useEffect } from 'react'

import {
  SideBySideMagnifier
} from "react-image-magnifiers";

//framework
import Grid from '@material-ui/core/Grid';

import dummyProd from '../../components/ProductsAtMainPage/dummy-products'

function Details(props) {
  const [prod, setProd] = useState({})

  useEffect(() => {
    setProd(dummyProd[0])
    // console.log(props.match.params.id)
    // server({
    //   url: `/products/${props.match.params.id}`,
    //   method: 'get'
    // })
    // .then(({data}) => {
    //   setProd(data)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }, [props])

  return (
    <div>
      <h2>{prod.name}</h2>
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
    </div>
  )
}

export default Details