import React, { useState, useEffect } from 'react'

// server
import server from '../../api'

//framework
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia';

function Details (props) {
  const [ prod, setProd ] = useState({})

  useEffect( () => {
    // console.log(props.match.params.id)
    server({
      url: `/products/${props.match.params.id}`,
      method: 'get'
    })
    .then(({data}) => {
      setProd(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [props])

  const imageWidth = window.innerWidth * 20 / 100

  return (
    <div>
      <h2>{prod.name}</h2>
      {/* <hr /> */}
      {/* <p>{JSON.stringify(prod)}</p> */}
      <Grid container direction="row" spacing={8} style={{width: '100%'}} justify="space-around">
        <Grid item style={{width: window.innerWidth / 2}}>
          <CardMedia
            component="img"
            alt={prod.name}
            img src={prod.image}
            height="80%"
            style={{objectFit: 'contain'}}
          />
        </Grid>
        <Grid item style={{width: window.innerWidth / 2}}>
          <h4>Description</h4>
          <p>{prod.name}</p>
          <p>{prod.description}</p>
        </Grid>
      </Grid>
    </div>
  )
}

export default Details