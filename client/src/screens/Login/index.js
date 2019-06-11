// import React, { Component } from 'react'

// //router
// import { withRouter } from 'react-router-dom'

// // framework
// import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'
// import Grid from '@material-ui/core/Grid';
// import FormControl from '@material-ui/core/FormControl';

// //server
// import server from '../../api'

// class Login extends Component {
//   state = {
//     email: '',
//     password: '',
//     // errors
//     errorMsg: ''
//   }

//   handleInput = (e) => {
//     this.setState({
//       [e.target.id]: e.target.value
//     })
//   }

//   handleSubmit = (e) => {
//     e.preventDefault()
    
//     server({
//       method: 'post',
//       url: '/users/login',
//       data: {
//         email: this.state.email,
//         password: this.state.password
//       }
//     })
//     .then(({data}) => {
//       this.setState({
//         errorMsg: ''
//       })
//       localStorage.setItem('token', data.token)
//       this.props.history.push('/')
//     })
//     .catch(({response}) => {
//       if (response) {
//         this.setState({
//           errorMsg: response.data.msg
//         })
//       }
//     })
//   }

//   render() {

//     const styles = {
//       field: {
//         width: window.innerWidth * 40 / 100
//       },
//       header: {
//         textAlign: 'center'
//       },
//       submitButton: {
//         marginTop: 40,
//         width: `10%`
//       },
//       error: {
//         color: 'red'
//       },
//     }

//     return (
//       <div>
//         <h3 style={styles.header}>Login</h3>
//         {this.state.errorMsg ?
//           <p style={styles.error}>{this.state.errorMsg}</p>
//           :
//           <></>
//         }
//         <Grid container justify="center">
//           <Grid item>
//             <form autoComplete="off" onSubmit={this.handleSubmit} >
//               <FormControl fullWidth style={styles.field}>
//                 <TextField
//                   id="email"
//                   // value={values.name}
//                   onChange={this.handleInput}
//                   placeholder="Email"
//                   margin="normal"
//                   type="email"
//                   // style={styles.field}
//                 />
//               </FormControl>
//               <FormControl fullWidth style={styles.field}>
//                 <TextField
//                   id="password"
//                   // value={values.name}
//                   onChange={this.handleInput}
//                   placeholder="Password"
//                   margin="normal"
//                   type="password"
//                   // style={styles.field2}
//                 />
//               </FormControl>
//               <div>
//                 <Button style={styles.submitButton} color="primary" type="submit" variant="contained">
//                   Login
//                 </Button>
//               </div>
//             </form>
//           </Grid>
//         </Grid>
//       </div>
//     )
//   }
// }

// export default withRouter(Login)

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
    <div>
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
    </div>
  )
}

export default withRouter(Login)
