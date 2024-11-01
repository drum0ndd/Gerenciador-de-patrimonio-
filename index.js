const express = require('express');
const app = express();

//Rota
//htpp
//nome
//Function (callback)

app.get('/', (_req, res) => {
    res.send('Hello World');
    });

    app.listen(3000);