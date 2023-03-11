import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { Login, Logout, Signup } from '~/graphql/auth.graphql'
import { FetchUsers } from '~/graphql/user.graphql'
import { handleGQL } from '~/helpers/graphql.helper'

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
    const { data } = await handleGQL(signup)
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
    const { data } = await handleGQL(login)
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
    const { data } = await handleGQL(logout)
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
    const { data } = await handleGQL(fetchUsers)
    return data.users
  },
}
