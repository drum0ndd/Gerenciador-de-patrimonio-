const mongoose = require('mongoose');
const PessoaSchema = require('./Pessoa');

const ProfessorSchema = new mongoose.Schema({
    pessoa: { type: PessoaSchema, required: true },
    departamento: { type: String, required: true },
    especialidade: { type: String },
    unidades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unidade' }],// Array de referências a Unidades que o professor é responsável
    tipo_egresso: { type: String, required: true },
    }, 
{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);