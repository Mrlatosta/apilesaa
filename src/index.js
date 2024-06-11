import express from 'express'
import {PORT} from './config.js'
import clienteRoutes from './routes/clientes.routes.js';
import morgan from 'morgan'




const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(clienteRoutes)

app.listen(PORT)

console.log('Server on port',PORT)