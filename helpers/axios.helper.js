import axios from 'axios'

export const graphqlInstance = axios.create({
  baseURL: `${process.env.NUXT_API_URL}/graphql`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'apollo-require-preflight': true,
  },
  withCredentials: true,
})

export const fileUploadInstance = axios.create({
  baseURL: `${process.env.NUXT_API_URL}/upload/`,
  withCredentials: true,
})
