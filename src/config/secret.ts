import { SSM } from '@aws-sdk/client-ssm'

const ssm = new SSM({
  region: process.env.AWS_REGION,
})

export const getSecret = async () => {
  const params = { Name: process.env.SSM_PARAM }
  const data = await ssm.getParameter(params)
  const secrets = JSON.parse(data.Parameter.Value)

  return secrets
}
