const express = require('express');
const userRoute = require('./src/routes/user.route.js');


const app = express();
//Habilita o uso do json
app.use(express.json());
app.use('/user', userRoute);
const port = 3000;


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));