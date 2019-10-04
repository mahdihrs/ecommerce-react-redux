import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import shopPage from './reducers/ShopPage';
import detailPage from './reducers/DetailPage';

const store = createStore (
    combineReducers({
      shopPage,
      detailPage
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;
