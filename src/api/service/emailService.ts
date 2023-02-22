import { Logger } from '@aws-lambda-powertools/logger'
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { getSecret } from '../../config'
import { validate } from '../../validator'
import { EmailInput, ErrorType, MessageType, ServiceType } from '../model/dto'

const logger = new Logger({
  serviceName: ServiceType.EMAIL,
  logLevel: process.env.LOG_LEVEL,
})

const ses = new SESClient({
  region: process.env.AWS_REGION,
})

export class EmailService {
  protected sendEmail = async (data: EmailInput) => {
    try {
      const secrets = await getSecret()
      const { to, subject, message } = data
      if (validate(to) === false) {
        throw new Error(`${ErrorType.INVALID}: ${MessageType.INVALID}`)
      }

      const input = {
        Destination: { ToAddresses: [to] },
        Message: {
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: message,
            },
          },
        },
        Source: secrets.SENDER,
      }

      const command = new SendEmailCommand(input)

      const response = await ses.send(command)

      return response
    } catch (err) {
      logger.error(ErrorType.SERVICE, err)

      throw new Error(`${ErrorType.SERVICE}: ${err}`)
    }
  }
}
