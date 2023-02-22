import { Logger } from '@aws-lambda-powertools/logger'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { MessageUtil } from '../../helpers'
import { EmailController } from '../controller/email'
import { ErrorType, MessageType, ServiceType } from '../model/dto'

const logger = new Logger({
  serviceName: ServiceType.EMAIL,
  logLevel: process.env.LOG_LEVEL,
})

const emailController = new EmailController()

export const send = async (event: APIGatewayEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    if (!event.body) {
      return MessageUtil.error(404, ErrorType.PAYLOAD, MessageType.EMPTY)
    }

    return await emailController.send(event)
  } catch (err) {
    logger.error(ErrorType.HANDLER, err)

    return MessageUtil.error(err.code, ErrorType.HANDLER, err.message)
  }
}
