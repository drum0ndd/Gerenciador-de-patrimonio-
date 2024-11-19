import mongoose from 'mongoose';
import User from '../Models/User.js';

const EspacoUFSCSchema = new mongoose.Schema({
    id_espaco:
    {
        type: String,
        required: true
    },
    nome: 
    { 
        type: String, 
        required: true 
    },

    descricao: 
    { 
        type: String, 
        required: false 
    },

    responsavel: 
    { 
        type: mongoose.Schema.Types.ObjectId,  // Referência a um professor (user = 1) responsável pela unidade
        ref: 'User',
        required: true 
    }, 

    lista_patrimonio: 
    [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patrimonio', 
        required: false 
    }],

    lista_participantes: 
    [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }],
});

const EspacoUFSC = mongoose.model("EspacoUFSC", EspacoUFSCSchema);
export default EspacoUFSC;