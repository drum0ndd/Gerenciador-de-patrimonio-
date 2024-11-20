import mongoose from 'mongoose';

const EspacoUFSCSchema = new mongoose.Schema({
    id_espaco:
    {
        type: Number,
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

    matricula_responsavel: 
    { 
        type: Number,  // Necessário verificar se a matricula é de um professor no momento da criação
        required: true 
    }, 

    lista_patrimonio: 
    [{ type: Number, 
        required: false  
    }],

    lista_participantes: 
    [{ type: Number, 
        required: false //pelo menos o professor tem q estar no espaco, fazer uma maneirq que ao criar um espaco o professor seja adicionado automaticamente
    }],
});

const EspacoUFSC = mongoose.model("EspacoUFSC", EspacoUFSCSchema);
export default EspacoUFSC;