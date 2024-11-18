import User from "../Models/User.js";

const loginService = async (matricula) =>
    await User.findOne({ matricula: matricula }).select("+senha  +matricula");

export { loginService };
