import { FETCH_LOCATIONS, CLEAR_LOCATIONS } from './types'
export const fetchLocations =
  (categoryIds = []) =>
  async (dispatch, getState) => {
    let url = '/locations?'

    for (const id of categoryIds) {
      if (id) {
        url += `category_in=${id}&`
      }
    }

    const res = {}
    dispatch({
      type: FETCH_LOCATIONS,
      payload: res.data,
    })
  }

export const clearLocations = () => ({
  type: CLEAR_LOCATIONS,
})
