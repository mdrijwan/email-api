import { ErrorType, MessageType, StatusCode } from '../api/model/dto'
import { ResponseVO } from '../api/model/vo'
import { Response } from './response'

export class MessageUtil {
  static success(data: object): ResponseVO {
    const result = new Response(StatusCode.SUCCESS, 200, undefined, MessageType.SUCCESS, data)

    return result.formatResponse()
  }

  static error(code?: number, errorType?: ErrorType, message?: string) {
    const result = new Response(StatusCode.ERROR, code, errorType, message)

    return result.formatResponse()
  }
}
