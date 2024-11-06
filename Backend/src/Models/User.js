const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sigla_curso: {
        type: String,
        required: true
    },
    matricula: { 
        type: String, 
        required: true 
    },
    tipo_egresso: { 
        type: String, 
        required: true 
    },
    senha: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);