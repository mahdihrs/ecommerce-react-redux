import React from 'react'
import { Link } from 'react-router-dom'

//framework
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function pieceOfStocks(amount) {
  return amount > 1 ? `${amount} pcs` : `${amount} pc`
}

function currencyConverter(amount) {
  return `Rp ${amount.toLocaleString()}`
}

function ProductList(props) {
  const userLoggedin = localStorage.getItem('token') ? true : false
  return (
    <Card style={{maxWidth: props.maxWidth, height: props.height, margin: 5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.products.name}
          height={props.contentHeight}
          image={props.products.image}
          title={props.products.name}
          // width="50%"
          style={{maxWidth: '100%', objectFit: 'contain'}}
        />
      </CardActionArea>
      <p style={{textAlign: 'center', fontSize: '0.7em'}}>{props.products.name}</p>
      <p style={{textAlign: 'center', fontSize: '0.7em'}}>Stock: <strong>{pieceOfStocks(props.products.stock)}</strong> left</p>
      <p style={{textAlign: 'center', fontSize: '0.7em'}}>{currencyConverter(props.products.price)}</p>
      <CardActions>
        <Grid container justify="center" direction="column">
          <Grid item>
            <Link to={`/details/${props.products._id}`}><Button style={{fontSize: '0.5em'}}><u>Shop Now</u></Button></Link>
          </Grid>
          {userLoggedin ?
            <Grid item>
              <p style={{fontSize: '0.7em'}}><u>Add To Cart</u></p>
            </Grid>
            :
            <></>
          }
        </Grid>
      </CardActions>
    </Card>
  );
}

export default ProductList;
