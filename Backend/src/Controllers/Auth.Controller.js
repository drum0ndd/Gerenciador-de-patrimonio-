import Bcrypt from "bcryptjs"
import {loginService} from "../Services/Auth.Service.js"

const login = async (req, res) => {
    const { matricula, senha } = req.body;
    try { 
        const user = await loginService("" + matricula);
        console.log(user);
    
        const senhaCorreta = Bcrypt.compareSync(senha, user.senha);

        if (!senhaCorreta|| !user.matricula) {
            return res.status(400).send({message: "Senha ou matricula não encontrado."});
        }

        res.send({message: "Login ok."});
     }  catch (error) {
            res.status(500).send({message: "Erro no servidor"});
     }
};

// User: {matricula: };
// User: {senha: };
export { login };