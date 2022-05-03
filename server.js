import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import routes from './src/routes/graphRoute';

const app = express();
const port = 3030;

app.use(userRoutes);

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Banco de dados conectado.');
        app.emit('databaseOn');
    })
    .catch(error => console.log('Erro ao conectar ao banco de dados: ', error)); 

app.on('bdOn', () => {
    app.listen(port, () => {
        console.log(`O servidor está rodando em https://localhost:${port}`);
    });
});