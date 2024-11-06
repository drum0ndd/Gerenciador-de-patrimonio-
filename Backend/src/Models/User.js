const mongoose = require('mongoose');
const PessoaSchema = require('./Pessoa');

const UserSchema = new mongoose.Schema({
    matricula: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    tipo_egresso: { 
        type: String, 
        required: true 
    },
    }, 
{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);