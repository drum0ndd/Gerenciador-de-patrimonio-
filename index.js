// Esses arquivos se referem aos imports basicos para que o server rode
//As rotas de cada entidade estão na pasta Route, a pasta Controller faz a lógca e a pasta Service está fazendo a conexão com o banco de dados
import express from 'express';
import connectDatabase from './Backend/src/database/db.js';
import userRoute from './Backend/src/routes/user.route.js';

const port = 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});