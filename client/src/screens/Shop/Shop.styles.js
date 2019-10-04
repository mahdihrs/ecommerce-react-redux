import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30%'//300,
  },
  shopSideBar: {
    width: 300,
    height: '100vh'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  productContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
    minWidth: 350
}
}));

export default useStyles;
