import User from "../Models/User.js";
import jwt from "jsonwebtoken";


const loginService = async (matricula) =>
    await User.findOne({ matricula: matricula }).select("+senha  +matricula");

// gera a sessão encriptografada do usuário
const generateToken = (id) => 
    jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400});

export { 
    loginService,
    generateToken,
 };
