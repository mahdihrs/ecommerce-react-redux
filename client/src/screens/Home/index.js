import React, { Component } from 'react'

//styles
import styles from './home-style'

//framework
import Grid from '@material-ui/core/Grid';

//components
import TopMenu from '../../components/Top-Menu'
import ProductList from '../../components/ProductsAtMainPage'
import Footer from '../../components/Footer'

//data
import dummies from '../../components/ProductsAtMainPage/dummy-products'

export default class Home extends Component {

	render() {
		return (
			<div>
				<TopMenu />
				<hr size="8" style={styles.horizontalLine} />
				<p style={styles.jargon}>People's style destination.</p>
				<hr style={{marginBottom: '25px'}} />
				{/* <img src="../../assets/headers/header1.jpg" alt="Header1" /> */}
				{/* <img src="https://images.pexels.com/photos/713829/pexels-photo-713829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=960" alt="Header1" /> */}
				<img src="https://images.pexels.com/photos/713829/pexels-photo-713829.jpeg?auto=compress&cs=tinysrgb&dpr=2" width="100%" height="60%" alt="Header1" />
				<hr style={styles.jargon} />
				<Grid container spacing={1} justify="center">
					{dummies.map(e => {
						return (
							<div key={e.name}>
								<Grid item>
									<ProductList products={e} maxWidth={200} height={300} contentHeight="140" />
								</Grid>
							</div>
						)
					})}
				</Grid>
				<Footer />
			</div>
		)
	}
}
