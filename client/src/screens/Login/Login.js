import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

// //router
import { withRouter } from 'react-router-dom'

// //server
import server from '../../api'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: window.innerWidth * 45 / 100,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  header: {
    textAlign: 'center'
  },
  submitButton: {
    marginTop: 40,
    width: `10%`
  },
  error: {
    color: 'red'
  },
}));

function Login(props) {
  const classes = useStyles()
  const [ state, setState ] = useState({
    email: '',
    password: '',
    // errors
    errorMsg: ''
  })

  const handleInput = (e) => {
    // console.log(e.target.id, e.target.value)
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    server({
      method: 'post',
      url: '/users/login',
      data: {
        email: state.email,
        password: state.password
      }
    })
    // async () => {
    //   try {
    //     const userLogin = await server({
    //       method: 'post',
    //       url: '/users/login',
    //       data: {
    //         email: state.email,
    //         password: state.password
    //       }
    //     })
    //     console.log(userLogin.data)
    //   } catch (err) {
    //       setState({
    //         ...setState,
    //         errorMsg: err.response.data.msg
    //       })          
    //   }
    // }
    .then(({data}) => {
      setState({
        ...setState,
        errorMsg: ''
      })
      localStorage.setItem('token', data.token)
      props.history.push('/')
    })
    .catch(({response}) => {
      if (response) {
        setState({
          ...setState,
          errorMsg: response.data.msg
        })
      }
    })
  }

  return (
    <>
      <h3 style={{textAlign: 'center'}}>Login</h3>
      {state.errorMsg ?
        <p style={{color: 'red'}}>{state.errorMsg}</p>
        :
        <></>
      }
      <Grid container justify="center">
        <Grid item>
          <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container direction='column'>
              <Grid item>
                <TextField
                  label="Email"
                  className={classes.textField}
                  margin="normal"
                  id="email"
                  // value={values.name}
                  onChange={handleInput}
                  placeholder="Email"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  label="Password"
                  className={classes.textField}
                  margin="normal"
                  id="password"
                  // value={values.name}
                  onChange={handleInput}
                  placeholder="Password"
                />
              </Grid>
              <Grid item>
                <div>
                  <Button classes={classes.submitButton} color="primary" type="submit" variant="contained">
                    Login
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default withRouter(Login)
