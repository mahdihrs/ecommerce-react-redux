import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: ({ width }) => width,
    height: ({ height }) => height,
    margin: 5
  },
  cardMedia: {
    maxWidth: '100%',
    objectFit: 'contain'
  },
  cardDescription: {
    textAlign: 'center',
    fontSize: '0.7em',
    lineHeight: '2em'
  },
  addToCartText: {
    fontSize: '0.7em',
    textDecoration: 'underline'
  },
  shopNowText: {
    fontSize: '0.5em',
    textDecoration: 'underline'
  }
}));

export default useStyles;
