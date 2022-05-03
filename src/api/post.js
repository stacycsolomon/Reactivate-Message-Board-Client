import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts/',
    data: {
      post: data
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const indexPosts = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
