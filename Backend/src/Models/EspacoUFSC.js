const mongoose = require('mongoose');

const EspacoUFSCSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: false },
    responsavel: { type: UserSchema, required: true }, // Referência a um professor (user = 1) responsável pela unidade
    patrimonio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patrimonio', required: false }],
    lista_participantes: [{ Type: list}] // Array de referências a patrimônios da unidade
});