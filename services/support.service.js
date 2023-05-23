import { print } from 'graphql'
import { handleGQL } from '~/helpers/graphql.helper'
import { graphqlInstance } from '~/helpers/axios.helper'
import {
  ProjectOrphans,
  CreateSupportPlan,
  FetchSupportPlan,
  CreatePayment,
  Payments,
  IndividualPayments,
  CreateManyIndividualPayments,
  FetchSupportPlans,
} from '~/graphql/support.graphql'
export async function fetchProjectOrphans(projectId, status = 'NEW') {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'ProjectOrphans',
      query: print(ProjectOrphans),
      variables: {
        filter: { projectId, status },
      },
    })
  )
  if (data) return data.projectOrphans
  throw errors
}

export async function createSupportPlan(createSupportPlanInput) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CreateSupportPlan',
      query: print(CreateSupportPlan),
      variables: {
        input: createSupportPlanInput,
      },
    })
  )
  if (data) return data.createSupportPlan
  throw errors
}

export async function fetchSupportPlans(projectId) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchSupportPlans',
      query: print(FetchSupportPlans),
      variables: {
        projectId,
      },
    })
  )
  if (data) return data.supportPlans
  throw errors
}

export async function fetchSupportPlan(id) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'FetchSupportPlan',
      query: print(FetchSupportPlan),
      variables: {
        id,
      },
    })
  )
  if (data) return data.supportPlan
  throw errors
}

export async function createPayment(createPaymentInput) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CreatePayment',
      query: print(CreatePayment),
      variables: {
        input: createPaymentInput,
      },
    })
  )
  if (data) return data.createPayment
  throw errors
}

export async function fetchPayments(supportPlanId) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'Payments',
      query: print(Payments),
      variables: {
        supportPlanId,
      },
    })
  )
  if (data) return data.payments
  throw errors
}

export async function fetchIndividualPayments(paymentId) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'IndividualPayments',
      query: print(IndividualPayments),
      variables: {
        paymentId,
      },
    })
  )
  if (data) return data.individualPayments
  throw errors
}

export async function createManyIndividualPayments(
  createManyIndividualPaymentsInput
) {
  const { data, errors } = await handleGQL(() =>
    graphqlInstance.post('', {
      operationName: 'CreateManyIndividualPayments',
      query: print(CreateManyIndividualPayments),
      variables: {
        input: createManyIndividualPaymentsInput,
      },
    })
  )
  if (data) return data.createManyIndividualPayments
  throw errors
}
