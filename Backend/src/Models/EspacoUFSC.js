const mongoose = require('mongoose');
const { interceptors } = require('undici-types');

const UnidadeSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: false },
    dataCriacao: { type: Date, required: true },
    responsavel: { type: ProfessorSchema, required: true }, // Referência a um professor responsável pela unidade
    patrimonio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patrimonio', required: false }] // Array de referências a patrimônios da unidade
    
}, {
    timestamps: true
});