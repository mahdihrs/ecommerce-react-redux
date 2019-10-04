import api from '../../api';
import {
  DETAIL_PRODUCT
} from '../reducers/ActionType';

export function fetchDetailProduct(id) {
  return dispatch=> {
    api({
      url: `/products/${id}`,
      method: 'get'
    })
    .then(({data}) => {
      dispatch({
        type: DETAIL_PRODUCT,
        payload: data
      })
      console.log(data, 'details')
    })
    .catch(err => {
      console.log(err)
    })
  }
}
