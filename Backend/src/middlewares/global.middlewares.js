import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validId = (req, res, next) => {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "ID inválido." });
    }
    next();
};

export const validUser = async (req, res, next) => {
    try {const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
    }

    req.id = id 
    req.user = user;

    next();} catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export default {
    validId, validUser,
};