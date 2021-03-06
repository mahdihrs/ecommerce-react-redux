import React from 'react';
import './App.css';

//router
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

//screens
import Home from './screens/Home/Home'
import Details from './screens/Details/Details'
import Admin from './screens/Admin/Admin'
import AddProductForm from './screens/AddProductForm/AddProductForm'
import Login from './screens/Login/Login'
import Shop from './screens/Shop/Shop'

// redux
import { Provider } from 'react-redux'
import store from './store';

//components
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ (props) => <Home /> } />
            <Route exact path="/login" component={ ( ) => <Login /> } />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/details/:id" component={Details} />
            {/* <Route exact path="/details" component={Details} /> */}
            <Route exact path="/admin" component={ () => <Admin /> } />
            <Route exact path="/admin/add-product" component={ () => <AddProductForm /> } />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
