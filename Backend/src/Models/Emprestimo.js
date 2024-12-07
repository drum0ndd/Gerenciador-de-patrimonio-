import mongoose from "mongoose";
import User from "../Models/User.js";
import Patrimonio from "../Models/Patrimonio.js";

// Definindo o schema do patrimônio
const EmprestimoSchema = new mongoose.Schema({
    espacoUFSC: { type: Number, required: true },
    matricula_professor: { type: Object, User, required: true },
    matricula_aluno: { type: Object, User, required: true },
    codigo_patrimonio: { type: Object, Patrimonio, required: true },
    data_registro: { type: Date, required: true },
    descricao: { type: String, required: false }, //não obrigatório
}, {
    timestamps: true // cria automaticamente campos "createdAt" e "updatedAt"
});

// Exportando o modelo baseado no schema para ser usado em outras partes do código

const Emprestimo = mongoose.model("Emprestimo", EmprestimoSchema);
export default Emprestimo;