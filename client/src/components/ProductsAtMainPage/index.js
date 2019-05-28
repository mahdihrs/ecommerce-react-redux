import React from 'react'

//framework
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function ProductList(props) {

  return (
    <Card style={{maxWidth: 160, height: 250}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.products.name}
          height="140"
          image={props.products.asset}
          title={props.products.name}
        />
      </CardActionArea>
      <p style={{textAlign: 'center', fontSize: '0.7em'}}>{props.products.name}</p>
      <CardActions>
        <Grid container justify="center">
          <Grid item>
            <Button style={{fontSize: '0.5em'}}><u>Shop Now</u></Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default ProductList;
