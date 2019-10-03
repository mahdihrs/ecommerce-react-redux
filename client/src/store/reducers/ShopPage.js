import {
  FETCH_PRODUCTS
} from '../reducers/ActionType';

const defaultState = {
  allProducts: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...defaultState,
        allProducts: action.payload
      }
    default:
      return state
  }
}
