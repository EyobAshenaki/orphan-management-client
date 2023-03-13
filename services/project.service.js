import { print } from 'graphql'
import { Projects } from '~/graphql/project.graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { handleGQL } from '~/helpers/graphql.helper'

export async function fetchProjects() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'Projects',
      query: print(Projects),
    })
  )
  if (data) return data.projects
  throw errors
}
