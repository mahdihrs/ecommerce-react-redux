import React from 'react';
import './App.css';

//router
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// parallax
import { ParallaxProvider } from 'react-scroll-parallax';
// parallax
import { Parallax } from 'react-scroll-parallax';

//screens
import Home from './screens/Home/'
import Details from './screens/Details'
import Admin from './screens/Admin'
import AddProductForm from './screens/Add-Product-Form'
import Login from './screens/Login'
import Shop from './screens/Shop'

//components
import Navbar from './components/Navbar/'

function App() {
  return (
    <div className="App">
      <Router>
        <ParallaxProvider>
          <Parallax className="custom-class" y={[-20, 0]} tagOuter="figure">
            <Navbar />
          </Parallax>
          <Switch>
            <Route exact path="/" component={ (props) => <Home /> } />
            <Route exact path="/login" component={ ( ) => <Login /> } />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/details/:id" component={Details} />
            <Route exact path="/admin" component={ () => <Admin /> } />
            <Route exact path="/admin/add-product" component={ () => <AddProductForm /> } />
          </Switch>
        </ParallaxProvider>
      </Router>
    </div>
  );
}

export default App;
