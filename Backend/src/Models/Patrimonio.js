import mongoose from 'mongoose';
// Definindo o schema do patrimônio
const PatrimonioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    nome_espacoUFSC: { type: String, required: true },
    resónsavel_espacoUFSC: { type: Number, required: true },
    estado: { type: String, enum: ['novo', 'usado', 'danificado'], required: true },
    dataRegistro: { type: Date, required: true },
    descricao: { type: String, required: false },
});

// Exportando o modelo baseado no schema para ser usado em outras partes do código
const Patrimonio = mongoose.model("Patrimonio", PatrimonioSchema);
export default Patrimonio;