const mongoose = require('mongoose');

const PessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    cpf: { type: String, unique: true, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Pessoa', PessoaSchema);
