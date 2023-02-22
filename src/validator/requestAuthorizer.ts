import { Logger } from '@aws-lambda-powertools/logger'
import { APIGatewayRequestAuthorizerEvent } from 'aws-lambda'
import { AuthEffect, InfoType, ServiceType } from '../api/model/dto'
import { getSecret } from '../config'

const logger = new Logger({
  serviceName: ServiceType.AUTH,
  logLevel: process.env.LOG_LEVEL,
})

export const handler = async function (event: APIGatewayRequestAuthorizerEvent) {
  const secrets = await getSecret()
  const methodArn = event.methodArn
  const token = event.headers.Authorization

  if (token === secrets.TOKEN) {
    return generateAuthResponse(AuthEffect.ALLOW, methodArn)
  } else return generateAuthResponse(AuthEffect.DENY, methodArn)
}

const generateAuthResponse = (effect, methodArn) => {
  const principalId = 'user'
  const policyDocument = generatePolicyDocument(effect, methodArn)
  const response = {
    principalId,
    policyDocument,
  }

  logger.info(InfoType.AUTH, { data: response })

  return response
}

const generatePolicyDocument = (effect, methodArn) => {
  if (!effect || !methodArn) return null

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: methodArn,
      },
    ],
  }

  return policyDocument
}
