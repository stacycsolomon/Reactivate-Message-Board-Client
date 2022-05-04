import apiUrl from '../apiConfig'
import axios from 'axios'

export const createComment = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/comments/',
    data: {
      comment: data
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
