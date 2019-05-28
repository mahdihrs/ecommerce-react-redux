import React, { Component } from 'react'
import ImageUploader from 'react-images-upload'

//framework
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//server
import server from '../../api'

export default class AddProductForm extends Component {
  state = {
    name: '',
    description: '',
    stock: 0,
    price: 0,
    pictures: [],
    //errors
    nameError: '',
    priceError: '',
    stockError: '',
    imageError: ''
  }

  onDrop = (picture) => {
    // this.onDrop.bind(this)
    console.log(picture)
    this.setState({
      pictures: this.state.pictures.concat(picture),
    })
  };

  // componentDidMount() {
  //   server({
  //     method: 'get',
  //     url: '/users'
  //   })
  //   .then(({data}) => {
  //     console.log(data)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  handleInput = (e) => {
    let field = e.target.id
    let val = e.target.value
    if (field === 'stock' && +val <= 0) console.log('Insufficient amount of stocks')
    else if (field === 'price' && +val <= 0 ) console.log('Insufficient amount of price')

    if (field === 'name') this.setState({name: val})
    else if (field = 'description') this.setState({description: val})
    else if (field = 'stock') this.setState({stock: val})
    else if (field = 'price') this.setState({price: val})

    console.log(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, description, price, stock, pictures } = this.state
    
    // if (stock <= 0) console.log('Insufficient amount of stocks')
    // else if (price <= 0 ) console.log('Insufficient amount of price')
    // console.log(this.state)

    server({
      method: 'post',
      url: '/products',
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
        image: pictures
      }
    })
    .then(({data}) => {
      console.log(data)
    })
    .catch(err => {
      console.log(err.data)
    })
  }

  render() {
    const { nameError, stockError, priceError, imageError } = this.props

    const styles = {
      field: {
        width: 600
      },
      header: {
        textAlign: 'center'
      }
    }

    return (
      <div>
        <h3 style={styles.header}>Add Product</h3>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            id="name"
            // value={values.name}
            onChange={this.handleInput}
            placeholder="Product Name"
            margin="normal"
            style={styles.field}
          />
          {nameError ?
            <p>{nameError}</p>  
            :
            <></>
          }
          <br />
          <TextField
            id="description"
            // value={values.name}
            onChange={this.handleInput}
            placeholder="Description"
            margin="normal"
            style={styles.field}
          />
          <br />
          <TextField
            id="price"
            type="number"
            // value={values.name}
            onChange={this.handleInput}
            placeholder="Price"
            margin="normal"
            style={styles.field}
          />
          <br />
          <TextField
            id="stock"
            type="number"
            // value={values.name}
            onChange={this.handleInput}
            placeholder="Stock"
            margin="normal"
            style={styles.field}
          />
          <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
          />
          <Button color="primary" type="submit" variant="contained" >
            Add Product
          </Button>
        </form>
      </div>
    )
  }
}
