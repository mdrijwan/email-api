export enum InfoType {
  // API Info
  API = 'API PAYLOAD INFO',
  AUTH = 'AUTHORIZER INFO',
}

export enum ErrorType {
  // Payload Errors
  PAYLOAD = 'EMAIL PAYLOAD ERROR',
  // Handler Errors
  HANDLER = 'EMAIL HANDLER ERROR',
  // Controller Errors
  CONTROLLER = 'EMAIL CONTROLLER ERROR',
  // Service Errors
  SERVICE = 'EMAIL SERVICE ERROR',
  // Validation Errors
  INVALID = 'VALIDATION ERROR',
}

export enum ServiceType {
  // Service Names
  EMAIL = 'EMAIL SERVICE',
  AUTH = 'AUTHORIZER SERVICE',
}

export enum StatusCode {
  // API Status Codes
  SUCCESS = 200,
  ERROR = 500,
}

export enum MessageType {
  // Response Messages
  SUCCESS = 'SUCCESSFUL',
  ERROR = 'ERROR',
  EMPTY = 'EMPTY PAYLOAD',
  INVALID = 'INVALID EMAIL ADDRESS',
}

export enum AuthEffect {
  ALLOW = 'Allow',
  DENY = 'Deny',
}
