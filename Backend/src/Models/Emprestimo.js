const mongoose = require('mongoose');

// Definindo o schema do patrimônio
const Emprestimo = new mongoose.Schema({
    id: { type: String, required: true },
    unidade: { type: String, required: true },
    professor: { type: Object, UserSchema, required: true },
    aluno: { type: Object, UserSchema, required: true },
    dataAquisicao: { type: Date, required: true },
    dataRetorno: { type: Date, required: false },
    descricao: { type: String, required: false },
}, {
    timestamps: true // cria automaticamente campos "createdAt" e "updatedAt"
});

// Exportando o modelo baseado no schema para ser usado em outras partes do código
module.exports = mongoose.model('Emprestimo', EmpresitmoSchema);
