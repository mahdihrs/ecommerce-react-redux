import React, { Component } from 'react'

//router
import { withRouter } from 'react-router-dom'

// framework
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//server
import server from '../../api'

class Login extends Component {
  state = {
    email: '',
    password: '',
    // errors
    errorMsg: ''
  }

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    server({
      method: 'post',
      url: '/users/login',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(({data}) => {
      this.setState({
        errorMsg: ''
      })
      localStorage.setItem('token', data.token)
      this.props.history.push('/')
    })
    .catch(({response}) => {
      if (response) {
        this.setState({
          errorMsg: response.data.msg
        })
      }
    })
  }

  render() {

    const styles = {
      field: {
        width: 600
      },
      header: {
        textAlign: 'center'
      },
      submitButton: {
        marginTop: 40,
        width: 100
      },
      error: {
        color: 'red'
      }
    }

    return (
      <div>
        <h3 style={styles.header}>Login</h3>
        {this.state.errorMsg ?
          <p style={styles.error}>{this.state.errorMsg}</p>
          :
          <></>
        }

        <form autoComplete="off" onSubmit={this.handleSubmit} >
          <TextField
            id="email"
            // value={values.name}
            onChange={this.handleInput}
            placeholder="Email"
            margin="normal"
            type="email"
            style={styles.field}
          />
          <TextField
            id="password"
            // value={values.name}
            onChange={this.handleInput}
            placeholder="Password"
            margin="normal"
            type="password"
            style={styles.field}
          />
          <div>
            <Button style={styles.submitButton} color="primary" type="submit" variant="contained">
              Login
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Login)