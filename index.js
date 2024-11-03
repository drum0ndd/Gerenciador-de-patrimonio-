// This file sets up and starts the Express server
import express from 'express';
import userRoute from './src/routes/user.route.js';

const app = express();
app.use('/user', userRoute);
const port = 3000;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));