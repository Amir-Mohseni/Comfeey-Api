import { NextFunction, Request, Response } from "express"

export const errorMiddleWare = ( req: Request, res: Response, next: NextFunction ) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  console.log('In Error Handler')
  
  res.status(statusCode)
  res.json({
		success: false,
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack
  })
}
