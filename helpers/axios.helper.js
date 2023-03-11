import axios from 'axios'

export const graphqlInstance = axios.create({
  baseURL: `${process.env.NUXT_API_URL}/graphql`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// todo: use this for file upload
// eslint-disable-next-line no-unused-vars
export const fileUploadInstance = axios.create({
  baseURL: `${process.env.API_URL}/upload`,
})
