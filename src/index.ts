import dontenv from 'dotenv'

if( process.env.mode !== 'production'){
  dontenv.config()
}

import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { initMongoDB } from './db'
import { errorHandler, errorMiddleWare } from './Middlewares/ErrorHandlers'

// Routes
import Productroutes from './Routes/Product'
import UserRoutes from './Routes/User'
import ReviewRoutes from './Routes/Review'
import OrderRoutes from './Routes/Order'
import CategoryRoutes from './Routes/Category'
import SubCategoryRoutes from './Routes/SubCategory'


const app = express()

initMongoDB()

app.use( cors() )
app.use( helmet() )
app.use( morgan('common') )
app.use( express.json() )
app.use(express.static("static"));


app.get('/', ( req: Request, res: Response ) => {
  console.log(req.originalUrl)
  res.send('Rest API for DopeGood.com')
})

app.use( '/api', Productroutes)
app.use( '/api', UserRoutes)
app.use( '/api', ReviewRoutes)
app.use( '/api', OrderRoutes)
app.use( '/api', CategoryRoutes)
app.use( '/api', SubCategoryRoutes)

app.use(errorMiddleWare)
app.use(errorHandler)

const port = process.env.PORT || 3000
console.log(process.env.PORT)
app.listen( port, () => {
  console.log(`Listening on port ${port}`)
})