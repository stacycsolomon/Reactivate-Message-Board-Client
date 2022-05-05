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

export const updateComment = (data, id, user, commentId) => {
  return axios({
    url: apiUrl + '/comments/' + commentId,
    method: 'patch',
    data: { comment: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
