import _ from 'lodash'
import { FETCH_LOCATIONS, CLEAR_LOCATIONS } from '../actions/types'

const initialState = {}

const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_LOCATIONS:
      return { ..._.mapKeys(payload, 'id') }

    case CLEAR_LOCATIONS:
      return {}

    default:
      return state
  }
}

export default locationReducer
