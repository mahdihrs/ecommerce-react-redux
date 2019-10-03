import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// import fetchAllRestos from './reducers/allRestos'
import shopPage from './reducers/ShopPage';

const store = createStore (
    combineReducers({
      shopPage
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;
