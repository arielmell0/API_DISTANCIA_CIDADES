import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3030;

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
})