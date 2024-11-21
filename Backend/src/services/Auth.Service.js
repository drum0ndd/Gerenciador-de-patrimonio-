import User from "../Models/User.js";
import jwt from "jsonwebtoken";


const loginService = async (matricula) => {
    // Busca um usuário com base na matrícula e inclui o campo "senha" (caso seja protegido no modelo)
    return await User.findOne({ matricula }).select("+senha");
};



// gera a sessão encriptografada do usuário
const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });
};

export { 
    loginService,
    generateToken,
 };
