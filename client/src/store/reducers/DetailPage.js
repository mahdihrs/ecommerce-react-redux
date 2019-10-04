import {
  DETAIL_PRODUCT
} from './ActionType'

const defaultState = {
  productToShow: {},
  loading: true
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case DETAIL_PRODUCT:
      return {
        ...defaultState,
        loading: false,
        productToShow: action.payload
      }
    default:
      return state
  }
}
