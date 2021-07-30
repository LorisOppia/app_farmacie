import _ from 'lodash'
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_FAILED,
} from '../actions/types'

const initialState = {
  categories: {},
  selected: [],
  loading: false,
  error: null,
}

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: { ..._.mapKeys(payload, 'id') },
        loading: false,
        error: null,
      }

    case FETCH_CATEGORIES_PENDING:
      return { ...state, loading: true }

    case FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, loading: false }

    default:
      return state
  }
}

export default categoryReducer
