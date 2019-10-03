import api from '../../api';
import {
  FETCH_PRODUCTS
} from '../reducers/ActionType';

export function fetchProductsOnShopPage() {
  return dispatch=> {
    api({
      url: `/products`,
      method: 'get'
    })
    .then(({data}) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data
      })
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
