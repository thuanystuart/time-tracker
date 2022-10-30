import { HttpContextToken } from "@angular/common/http"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGN_UP = 'SIGN_UP'

export const requestTypesList = ['', LOGIN, LOGOUT, SIGN_UP] as const
export type requestTypes = typeof requestTypesList[number]
export const REQUEST_TYPE = new HttpContextToken<requestTypes>(() => '')
