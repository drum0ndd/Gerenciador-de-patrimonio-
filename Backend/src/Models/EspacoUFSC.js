import mongoose from 'mongoose';

const EspacoUFSCschema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    matricula_responsavel: { type: Number, required: true },
    // Atualizando os campos para ObjectId com referências
    lista_patrimonios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patrimonio" }], 
    lista_participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participante" }], 
    lista_emprestimos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Emprestimo" }],   
});

const EspacoUFSC = mongoose.model("EspacoUFSC", EspacoUFSCschema);
export default EspacoUFSC;