import { print } from 'graphql'
import { Projects, CreateProject } from '~/graphql/project.graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { handleGQL } from '~/helpers/graphql.helper'
import { SupportPlansByProjectId } from '~/graphql/support.graphql'
  
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

export async function fetchSupportPlansByProjectId(projectId) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'SupportPlansByProjectId',
      query: print(SupportPlansByProjectId),
      variables: {
        projectId,
      },
    })
  )
  if (data) return data.supportPlans
  throw errors
}

export async function createProject(createProjectInput) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CreateProject',
      query: print(CreateProject),
      variables: {
        input: createProjectInput,
      },
    })
  )

  if (data) return data.createProject
  throw errors
}
