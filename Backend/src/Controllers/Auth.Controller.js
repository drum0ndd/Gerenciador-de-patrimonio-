import Bcrypt from "bcryptjs"
import {loginService, generateToken} from "../services/Auth.Service.js";

const login = async (req, res) => {
    const { matricula, senha } = req.body;
    try { 
        const user = await loginService("" + matricula);
        console.log(user);
    
        const senhaCorreta = Bcrypt.compareSync(senha, user.senha);

        if (!senhaCorreta|| !user.matricula) {
            return res.status(400).send({message: "Senha ou matricula não encontrado."});
        }

        const token = generateToken(user.id);

        res.send({Token: token});
     }  catch (error) {
            res.status(500).send({message: "Erro no servidor"});
     }
};

// User: {matricula: };
// User: {senha: };
export { 
    login,
};