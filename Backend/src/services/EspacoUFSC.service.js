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



export default {
    CreateService,
    findAllService,
    findByIdService,
    DeleteEspacoUFSCbyId,
};