import api from '../../api';
import {
  DETAIL_PRODUCT
} from '../reducers/ActionType';

export function fetchDetailProduct() {
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
