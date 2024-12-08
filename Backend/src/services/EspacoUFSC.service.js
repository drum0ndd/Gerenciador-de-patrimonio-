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

const addEmprestimo = async (id, emprestimo) => {
    const espaco = await EspacoUFSC.findById(id);
    if (!espaco) {
        throw new Error("Espaço UFSC não encontrado no banco de dados.");
    }    
};   

const addPatrimonio = async (id, patrimonio) => {
    const espaco = await EspacoUFSC.findById(id);
    if (!espaco) {
        throw new Error("Espaço UFSC não encontrado no banco de dados.");
    }
    espaco.lista_patrimonios.push(patrimonio);
    await espaco.save();
};


export default {
    CreateService,
    findAllService,
    findByIdService,
    DeleteEspacoUFSCbyId,
    addEmprestimo,
    addPatrimonio,
};