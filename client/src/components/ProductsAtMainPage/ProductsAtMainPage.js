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
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from './ProductsAtMainPage.styles';

function pieceOfStocks(amount) {
  return amount > 1 ? `${amount} pcs` : `${amount} pc`
}

function currencyConverter(amount) {
  return `Rp ${amount.toLocaleString()}`
}

function ProductList({
  width,
  height,
  products,
  contentHeight,
  ...props
}) {
  const userLoggedin = localStorage.getItem('token') ? true : false;
  const classes = useStyles({
    width: width,
    height: height
  });

  return (
    <Card className={classes.cardContainer} >
      <CardActionArea>
        <Link to={`/details/${products._id}`}>
          <CardMedia
            component="img"
            alt={products.name}
            height={contentHeight}
            image={products.image}
            title={products.name}
            className={classes.cardMedia}
          />
        </Link>
      </CardActionArea>
      <div>
        <Typography className={classes.cardDescription} component="p" variant="body1">{products.name}</Typography>
        <Typography className={classes.cardDescription} component="p" variant="body1">Stock: <strong>{pieceOfStocks(products.stock)}</strong> left</Typography>
        <Typography className={classes.cardDescription} component="p" variant="body1">{currencyConverter(products.price)}</Typography>
      </div>
      <CardActions>
        <Grid container justify="center" direction="column">
          <Grid item>
            <Link to={`/details/${products._id}`}>
              <Button className={classes.shopNowText}>
                Shop Now
              </Button>
            </Link>
          </Grid>
          {
            userLoggedin
            &&
            <Grid item>
              <Typography variant="body1" className={classes.addToCartText}>
                Add To Cart
              </Typography>
            </Grid>
          }
        </Grid>
      </CardActions>
    </Card>
  );
}

export default ProductList;
