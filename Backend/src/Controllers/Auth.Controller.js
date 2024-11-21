import Bcrypt from "bcryptjs"
import {loginService, generateToken} from "../services/Auth.Service.js";

const login = async (req, res) => {
    const { matricula, senha } = req.body;

    try {
        // Busca o usuário pela matrícula
        const user = await loginService(matricula);

        if (!user) {
            return res.status(400).send({ message: "Matrícula ou senha incorreta." });
        }

        // Compara a senha fornecida com a senha armazenada (criptografada)
        const senhaCorreta = Bcrypt.compareSync(senha, user.senha);

        if (!senhaCorreta) {
            return res.status(400).send({ message: "Matrícula ou senha incorreta." });
        }

        // Gera o token JWT para autenticação
        const token = generateToken(user.id);

        res.status(200).send({
            message: "Autenticação bem-sucedida!",
            token,
        });
    } catch (error) {
        console.error("Erro no login:", error.message);
        res.status(500).send({ message: "Erro no servidor." });
    }
};


// User: {matricula: };
// User: {senha: };
export { 
    login,
};