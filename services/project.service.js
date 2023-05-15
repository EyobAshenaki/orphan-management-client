import { print } from 'graphql'
import {
  FetchProjects,
  CountProjects,
  FetchProject,
  CreateProject,
} from '~/graphql/project.graphql'
import { graphqlInstance } from '~/helpers/axios.helper'
import { handleGQL } from '~/helpers/graphql.helper'
import { SupportPlansByProjectId } from '~/graphql/support.graphql'

export async function fetchProjects() {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchProjects',
      query: print(FetchProjects),
    })
  )
  if (data) return data.projects

  throw errors
}

export async function countProjects(status = null) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CountProjects',
      query: print(CountProjects),
      variables: {
        status,
      },
    })
  )
  if (data) return data._count_projects

  throw errors
}

export async function fetchProject(projectId) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchProject',
      query: print(FetchProject),
      variables: {
        id: projectId,
      },
    })
  )
  if (data) return data.project

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
