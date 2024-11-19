import mongoose from "mongoose";
import userService from "../services/user.service.js";
import PatrimonioService from "../services/Patrimonio.Service.js";
import EmprestimoService from "../Services/Emprestimo.service.js";
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

export const validProfessor = async (req, res, next) => {
    try {
        const ProfessorCorreto = await userService.findByIdService(id);
        if (!ProfessorCorreto){
            return res.status(400).json({ message: "Professor não encontrado"});
        }

        //Verifica se o professor é um professor  mesmo
        if (ProfessorCorreto.tipo_egresso === 2){
            return res.status(400).json({ message: "O usuário informado não é um professor"});
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const validAluno = async (req, res, next) => {
    try{
        const AlunoCorreto = await userService.findByIdService(id);
        if (!AlunoCorreto){
            return res.status(400).json({ message: "Aluno não encontrado"});
        }

        //Verifica se o aluno é um aluno mesmo
        if (AlunoCorreto.tipo_egresso !== 1){
            return res.status(400).json({ message: "O usuário informado não é um aluno"});
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

};

export default {
    validId, 
    validUser,
    validPatrimonio,
    validEmprestimo,
    validEspacoUFSC,
    validProfessor,
    validAluno,
};