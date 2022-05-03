import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3030;

app.listen(port, () => {
    console.log(`O servidor está rodando em https://localhost:${port}`);
});