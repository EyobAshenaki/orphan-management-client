import axios from 'axios'
import { print } from 'graphql'
import { Login, Logout, Signup } from '~/graphql/auth.graphql'
import { FetchUsers } from '~/graphql/user.graphql'

const graphqlInstance = axios.create({
  baseURL: `${process.env.NUXT_API_URL}/graphql`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// todo: use this for file upload
// eslint-disable-next-line no-unused-vars
const fileUploadInstance = axios.create({
  baseURL: `${process.env.API_URL}/upload`,
})

export default {
  async createUser(userInput) {
    const signup = async () => {
      const response = await graphqlInstance.post('', {
        operationName: 'Signup',
        query: print(Signup),
        variables: {
          input: userInput,
        },
      })
      return response
    }
    const data = await handleGQL(signup)
    return data.signup.user
  },
  async login(email, password) {
    const login = async () => {
      const response = await graphqlInstance.post('', {
        operationName: 'Login',
        query: print(Login),
        variables: {
          input: {
            email,
            password,
          },
        },
      })
      return response
    }
    const data = await handleGQL(login)
    return data.login.user
  },
  // todo:  implement full logout
  async logout() {
    const logout = async () => {
      const response = await graphqlInstance.post('', {
        operationName: 'Logout',
        query: print(Logout),
      })
      return response
    }
    const data = await handleGQL(logout)
    return data.logout
  },
  async fetchUsers() {
    const fetchUsers = async () => {
      const response = await graphqlInstance.post('', {
        operationName: 'FetchUsers',
        query: print(FetchUsers),
      })
      return response
    }
    const data = await handleGQL(fetchUsers)
    return data.users
  },
}

const handleGQL = async (handler) => {
  try {
    const response = await handler()
    if (response) {
      if (!response?.data) {
        throw new Error('No data in response', response)
      }
      if (!response?.data?.data) {
        throw new Error('No data.data in response', response.data.errors)
      }
      const { data } = response.data
      return data
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    // todo: handle error
    // todo: display error if needed
  }
}
