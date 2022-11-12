import { HttpContextToken } from "@angular/common/http"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGN_UP = 'SIGN_UP'

export const requestTypesList = ['', LOGIN, LOGOUT, SIGN_UP] as const
export type requestTypes = typeof requestTypesList[number]
export const REQUEST_TYPE = new HttpContextToken<requestTypes>(() => '')

export interface errorHandlerType { handle: boolean, showMessage?: boolean }
export const ERROR_HANDLER_CONFIG = new HttpContextToken<errorHandlerType>(() => ({
  handle: true,
  showMessage: true,
}))

export const RESPONSE_TYPE_HEADER = new HttpContextToken<"arraybuffer" | "blob" | "json" | "text" | undefined>(() => ('json'))
