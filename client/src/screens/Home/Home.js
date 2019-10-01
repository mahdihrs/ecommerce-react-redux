import React from 'react';

// react slick
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from '../../components/ProductsAtMainPage/Slider'

//styles
import useStyles from './Home.styles';

//framework
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

//components
import TopMenu from '../../components/TopMenu/TopMenu';
import ProductList from '../../components/ProductsAtMainPage/ProductsAtMainPage';
import Footer from '../../components/Footer/Footer';

//data
import dummies from '../../components/ProductsAtMainPage/dummy-products';

function Home () {
	const classes = useStyles();

	let settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		speed: 1200,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 3
	};

	return (
		<div>
			<TopMenu />
			<hr size="8" className={classes.horizontalLine} />
			<p className={classes.jargon}>People's style destination.</p>
			<hr className={classes.secondHorizonalLine} />
			{/* <img src="../../assets/headers/header1.jpg" alt="Header1" /> */}
			{/* <img src="https://images.pexels.com/photos/713829/pexels-photo-713829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=960" alt="Header1" /> */}
			<img src="https://images.pexels.com/photos/713829/pexels-photo-713829.jpeg?auto=compress&cs=tinysrgb&dpr=2" width="100%" height="60%" alt="Header1" />
			<hr className={classes.jargon} />
			<Container maxWidth="lg">
				<Slider settings={settings}>
					{dummies.map(dummy => {
						return (
							<div key={dummy.name} className={classes.sliderContainer}>
								<ProductList products={dummy} width={225} height={300} contentHeight="140" />
							</div>
						)
					})}
				</Slider>
			</Container>
			<Footer />
		</div>
	)
}

export default Home;
