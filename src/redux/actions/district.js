import {
  FETCH_DISTRICTS_SUCCESS,
  FETCH_DISTRICTS_PENDING,
  FETCH_DISTRICTS_FAILED,
} from './types'

export const fetchDistricts = () => async dispatch => {
  dispatch({
    type: FETCH_DISTRICTS_PENDING,
  })
  try {
    const res = {}
    dispatch({
      type: FETCH_DISTRICTS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: FETCH_DISTRICTS_FAILED,
      payload: error,
    })
  }
}
