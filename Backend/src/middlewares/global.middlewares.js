import mongoose from "mongoose";
import userService from "../services/User.service.js";
import PatrimonioService from "../services/Patrimonio.Service.js";
import EmprestimoService from "../services/Emprestimo.service.js";
import EspacoUFSC from "../services/EspacoUFSC.service.js";

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

export const validPatrimonio = async (req, res, next) => {
    try {const id = req.params.id;

    const patrimonio = await PatrimonioService.findByIdService(id);

    if (!patrimonio) {
        return res.status(404).send({ message: "Patrimonio não encontrado!" });
    }

    req.id = id 
    req.patrimonio = patrimonio;

    next();} catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const validEmprestimo = async (req, res, next) => {
    try {const id = req.params.id;

    const emprestimo = await EmprestimoService.findByIdService(id);

    if (!emprestimo) {
        return res.status(404).send({ message: "Emprestimo não encontrado!" });
    }

    req.id = id 
    req.emprestimo = emprestimo;

    next();} catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const validEspacoUFSC = async (req, res, next) => {
    try {const id = req.params.id;

        const espacoUFSC = await EspacoUFSC.findByIdService(id);

        if (!espacoUFSC) {
            return res.status(404).send({ message: "EspacoUFSC não encontrado!" });
        }

        req.id = id 
        req.espacoUFSC = espacoUFSC;

        next();} catch (err) {
            res.status(500).send({ message: err.message });
        }
};

export const isProfessor = async (matricula) => {
        const user = userService.isUserProfessorByMatricula(matricula);
    
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
    
        return user; // Retorna o usuário válido
};

export default {
    validId, 
    validUser,
    validPatrimonio,
    validEmprestimo,
    validEspacoUFSC,
    isProfessor,
};