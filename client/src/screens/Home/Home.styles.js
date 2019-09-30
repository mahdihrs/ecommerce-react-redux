import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  horizontalLine: {
    width: `100%`,
    backgroundColor: '#000'
  },
  secondHorizontalLine: {
    marginBottom: '25px'
  },
  jargon: {
    margin: '25px 0px'
  },
  sliderContainer: {
    display: 'flex !important',
    justifyContent: 'center',
    flexDirection: 'row'
  }
}))

export default useStyles;
