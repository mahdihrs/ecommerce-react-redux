import React, { Component } from 'react'

// framework
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// components
import AdminTopMenu from '../../components/Admin-Top-Menu'

//styles
import AdminStyles from './Admin-Styles'

export default class Admin extends Component {
  render() {
    return (
      <div style={AdminStyles.wholeMenu}>
        <div style={AdminStyles.mainMenu}>
          <AdminTopMenu height={AdminStyles.mainMenu} buttonSize={AdminStyles.buttonSize} />
        </div>
      </div>
    )
  }
}
