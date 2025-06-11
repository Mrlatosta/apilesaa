import express from 'express';
import { DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE, DB_PORT, PORT } from './config.js';
import clienteRoutes from './routes/clientes.routes.js';
import morgan from 'morgan';
import pkg from 'pg';
import authRoutes from './routes/auth.routes.js'; // <- importa la ruta de login


const { Client } = pkg;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(clienteRoutes);
app.use(authRoutes); // <- monta la ruta de login


const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT
});



client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

