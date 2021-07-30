import _ from 'lodash'
import {
  FETCH_DISTRICTS_SUCCESS,
  FETCH_DISTRICTS_PENDING,
  FETCH_DISTRICTS_FAILED,
} from '../actions/types'

const initialState = {
  districts: {},
  loading: false,
  error: null,
}

const districtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DISTRICTS_SUCCESS:
      return {
        ...state,
        districts: {
          ..._.mapKeys(payload, 'id'),
        },
        loading: false,
        error: null,
      }

    case FETCH_DISTRICTS_PENDING:
      return { ...state, loading: true }

    case FETCH_DISTRICTS_FAILED:
      return { ...state, error: payload, loading: false }

    default:
      return state
  }
}

export default districtReducer
