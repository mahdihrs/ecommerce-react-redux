import React from 'react';

// material-ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// styles
import useStyles from './ShopComponents.styles';

// constants
import { Categories, Prices, Brands } from '../../constants/SideMenu';

function SideMenu() {
  const classes = useStyles();

  // const handleChange = name => event => {
  //   setState({ 
  //     ...state, 
  //     [name]: event.target.checked 
  //   });
  // };

  return (
    <>
      <div className={classes.categoriesSideMenuContainer}>
        <Typography variant="h6" align="left" className={classes.subTitleSideMenu}>
          Bags
        </Typography>
        {Categories.Bags.map((bag) => (
          <div key={bag}>
            <FormControlLabel
              control={
                <Checkbox checked={false} value="checkedA" />
              }
              label={
                <Typography variant="body1" align="left">
                  {bag}
                </Typography>
              }
              classes={{
                root: classes.formControlLabel
              }}
            />
          </div>
        ))}
      </div>
      <div className={classes.pricesSIdeMenuContainer}>
        <Typography variant="h6" align="left" className={classes.subTitleSideMenu}>
          Price
        </Typography>
        {Prices.map((price) => (
          <div key={price.category}>
            <FormControlLabel
              control={
                <Checkbox checked={false} value="checkedA" />
              }
              label={
                <Typography variant="body1" align="left">
                  {price.text}
                </Typography>
              }
              classes={{
                root: classes.formControlLabel
              }}
            />
          </div>
        ))}
      </div>
      <div className={classes.pricesSIdeMenuContainer}>
        <Typography variant="h6" align="left" className={classes.subTitleSideMenu}>
          Brands
        </Typography>
        {Brands.map((brand) => (
          <div key={brand}>
            <FormControlLabel
              control={
                <Checkbox checked={false} value="checkedA" />
              }
              label={
                <Typography variant="body1" align="left">
                  {brand}
                </Typography>
              }
              classes={{
                root: classes.formControlLabel
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default SideMenu;
