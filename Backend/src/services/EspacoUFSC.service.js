import EspacoUFSC from '../Models/EspacoUFSC.js';
import mongoose from "mongoose";


const CreateService = (body) => {
    if (typeof body !== 'object' || body === null) {
        throw new Error("O argumento passado deve ser um objeto válido.");
    }
    return EspacoUFSC.create(body);
};

const findAllService = () => EspacoUFSC.find();

const findByIdService = (id) => EspacoUFSC.findById(id);

const DeleteEspacoUFSCbyId = (id) => EspacoUFSC.findByIdAndDelete(id);

const addEmprestimo = async (validEspacoUFSC, emprestimo) => {
    if (!validEspacoUFSC) {
        throw new Error("Espaço UFSC não encontrado no banco de dados.");
    }
    if (!Array.isArray(validEspacoUFSC.emprestimos)) {
        validEspacoUFSC.emprestimos = [];
    }
    validEspacoUFSC.emprestimos.push(emprestimo);
    await validEspacoUFSC.save();   
};   

const addPatrimonio = async (patrimonio, emprestimo) => {
    if (!patrimonio) {
        throw new Error("Patrimonio não encontrado no banco de dados.");
    }
    if (!Array.isArray(emprestimo.lista_patrimonios)) {
        emprestimo.lista_patrimonios = [];
    }
    patrimonio.emprestimos.push(emprestimo);
    await patrimonio.save();
};


export default {
    CreateService,
    findAllService,
    findByIdService,
    DeleteEspacoUFSCbyId,
    addEmprestimo,
    addPatrimonio,
};