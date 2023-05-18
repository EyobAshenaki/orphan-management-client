import { print } from 'graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { Login, Logout, Signup } from '~/graphql/auth.graphql'
import {
  FetchUsers,
  FetchCoordinators,
  FetchSimpleCoordinatorNames,
} from '~/graphql/user.graphql'
import { handleGQL } from '~/helpers/graphql.helper'

export async function createUser(userInput) {
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
  const { data, errors } = await handleGQL(signup)
  if (data) return data.signup.user
  throw errors
}

export async function login(email, password) {
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
  const { data, errors } = await handleGQL(login)
  if (data) return data.login.user
  throw errors
}

export async function logout() {
  const logout = async () => {
    const response = await graphqlInstance.post('', {
      operationName: 'Logout',
      query: print(Logout),
    })
    return response
  }
  const { data, errors } = await handleGQL(logout)
  if (data) return data.logout
  throw errors
}

export async function fetchUsers() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchUsers',
      query: print(FetchUsers),
    })
  )
  if (data) return data.users
  throw errors
}

export async function fetchCoordinators(simple = false) {
  const { data, errors } = await handleGQL(async () => {
    const response = await graphqlInstance.post('', {
      operationName: simple
        ? 'FetchSimpleCoordinatorNames'
        : 'FetchCoordinators',
      query: simple
        ? print(FetchSimpleCoordinatorNames)
        : print(FetchCoordinators),
    })
    return response
  })
  if (data) return data.coordinators
  throw errors
}
