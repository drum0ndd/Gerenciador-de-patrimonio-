import mongoose from 'mongoose';

const EspacoUFSCSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    matricula_responsavel: { type: Number, required: true },
    lista_patrimonios: [{ type: Number, required: false }],
    lista_participantes: [{ type: Number, required: false }]
});


const EspacoUFSC = mongoose.model("EspacoUFSC", EspacoUFSCSchema);
export default EspacoUFSC;