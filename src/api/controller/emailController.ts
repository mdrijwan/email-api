import { Logger } from '@aws-lambda-powertools/logger'
import { APIGatewayEvent } from 'aws-lambda'
import { MessageUtil } from '../../helpers'
import { ErrorType, InfoType, ServiceType } from '../model/dto'
import { EmailService } from '../service/emailService'

const logger = new Logger({
  serviceName: ServiceType.EMAIL,
  logLevel: process.env.LOG_LEVEL,
})

export class EmailController extends EmailService {
  async send(event: APIGatewayEvent) {
    try {
      const data = JSON.parse(event.body)
      logger.info(InfoType.API, { data: data })

      const result = await this.sendEmail(data)

      return MessageUtil.success({ messageId: result.MessageId })
    } catch (err) {
      logger.error(ErrorType.CONTROLLER, err)

      return MessageUtil.error(err.code, ErrorType.CONTROLLER, err.message)
    }
  }
}
