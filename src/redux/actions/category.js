import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_FAILED,
} from './types'

export const fetchCategories = () => async dispatch => {
  dispatch({
    type: FETCH_CATEGORIES_PENDING,
  })
  try {
    const res = {}
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: FETCH_CATEGORIES_FAILED,
      payload: err,
    })
  }
}
