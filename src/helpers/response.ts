import { ErrorType } from '../api/model/dto'

export class Response {
  static now = new Date().toISOString()
  private statusCode: number
  private code: number
  private errorType?: ErrorType
  private message?: string
  private data?: object

  constructor(
    statusCode: number,
    code: number,
    errorType?: ErrorType,
    message?: string,
    data?: object
  ) {
    this.statusCode = statusCode
    this.code = code
    this.errorType = errorType
    this.message = message
    this.data = data
  }

  formatResponse() {
    return {
      statusCode: this.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: this.code,
        errorType: this.errorType,
        message: this.message,
        data: this.data,
      }),
    }
  }
}
