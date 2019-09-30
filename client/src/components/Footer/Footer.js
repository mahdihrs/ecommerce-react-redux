import React from 'react';

//framework
import Grid from '@material-ui/core/Grid';

const style = {
  container: {
    backgroundColor: 'rgb(69, 80, 178)',
    height: 300,
    marginTop: 40
  },
  characters: {
    color: 'rgb(168, 172, 175)',
    textAlign: 'left'
  },
  contentFont: {
    fontSize: '0.75em',
    color: '#fff',
    textAlign: 'left'
  }
}

export default function footer () {
  return (
    <div style={style.container}>
      <Grid container direction="row" justify="space-evenly">
        <Grid item>
          <p style={style.characters}>ABOUT US</p>
          <div style={style.contentFont}>
            <p>HISTORY</p>          
            <p>JOBS</p>
            <p>BLOG</p>
            <p>PRESS CONTACTS</p>
            <p>SOCIAL RESPONSIBILITY</p>
            <p>STORE LOCATOR</p>
            <p>ORDER INFO</p>
          </div>
        </Grid>
        <Grid item>
          <p style={style.characters}>USEFUL INFO</p>
          <div style={style.contentFont}>
            <p>CONTACT</p>
            <p>DELIVERY</p>
            <p>FAQs</p>
            <p>FOR LIFE</p>
            <p>PRIVACY AND COOKIES POLICY</p>
            <p>PROMOTIONS T&Cs</p>
            <p>RETURNS</p>
            <p>SITE MAP</p>
            <p>SIZE GUIDE</p>
          </div>
        </Grid>
        <Grid item>
          <p style={style.characters}>CONNECT</p>
          <div style={style.contentFont}>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Youtube</p>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
