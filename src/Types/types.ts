import { Request } from 'express'

export interface ReqWithUser extends Request {
	user: Token
}

export interface Token {
	_id: string
}