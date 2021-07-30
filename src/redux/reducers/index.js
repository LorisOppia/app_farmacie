import { combineReducers } from 'redux'
import authReducer from './auth'
import mapReducer from './map'
import districtReducer from './district'
import categoryReducer from './category'
import locationReducer from './location'

export default combineReducers({
  auth: authReducer,
  map: mapReducer,
  district: districtReducer,
  category: categoryReducer,
  location: locationReducer,
})
