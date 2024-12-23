// Esses arquivos se referem aos imports basicos para que o server rode
//As rotas de cada entidade(model) estão na pasta Route, a pasta Controller faz a lógca e a pasta Service está fazendo a conexão com o banco de dados
import express from 'express';
import connectDatabase from './Backend/src/database/db.js';
import dotenv from 'dotenv';


import userRoute from './Backend/src/routes/user.route.js';
import authRoute from './Backend/src/routes/auth.route.js';
import espacoUFSCRoute from './Backend/src/routes/espacoUFSC.route.js';
import emprestimoRoute from './Backend/src/routes/Emprestimo.route.js';
import patrimonioRoute from './Backend/src/routes/Patrimonio.route.js';



dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/emprestimo", emprestimoRoute);
app.use("/espacoufsc", espacoUFSCRoute);
app.use("/patrimonio", patrimonioRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});