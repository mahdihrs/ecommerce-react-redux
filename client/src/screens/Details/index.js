import React, { useState, useEffect } from 'react'

// server
import server from '../../api'

//framework
import Grid from '@material-ui/core/Grid'

function Details (props) {
  // const [ resId, setResId ] = useState('5cee0838b802c913eb647530')
  const [ prod, setProd ] = useState('')

  useEffect( () => {
    server({
      url: `/products/5cee0838b802c913eb647530`,//${resId},
      method: 'get'
    })
    .then(({data}) => {
      // console.log(data)
      setProd(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const imageWidth = window.innerWidth * 20 / 100

  return (
    <div>
      <h2>{prod.name}</h2>
      {/* <hr /> */}
      <Grid container spacing={8} style={{width: '100%'}} justify="space-evenly">
        <Grid item>
          <img src={prod.image} alt={prod.name} style={{width: imageWidth}} />
          <p>{window.innerWidth}</p>
        </Grid>
        <Grid item>
          <h4>Description</h4>
          <p>{prod.name}</p>
          <p>{prod.description}</p>
        </Grid>
      </Grid>
    </div>
  )
}

export default Details