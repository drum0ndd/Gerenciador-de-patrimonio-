const mongoose = require('mongoose');

// Definindo o schema do patrimônio
const PatrimonioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    unidade: { type: String, required: true },
    estado: { type: String, enum: ['novo', 'usado', 'danificado'], required: true },
    dataRegistro: { type: Date, required: true },
    descricao: { type: String, required: false },
});

// Exportando o modelo baseado no schema para ser usado em outras partes do código
module.exports = mongoose.model('Patrimonio', PatrimonioSchema);
