import mongoose from "mongoose";
import User from "../Models/User.js";
import Patrimonio from "../Models/Patrimonio.js";

// Definindo o schema do patrimônio
const EmprestimoSchema = new mongoose.Schema({
    espacoUFSC: { type: String , required: true },
    matricula_professor: { type: Number , required: true },
    matricula_aluno: { type: Number , required: true },
    codigo_patrimonio: { type: String , required: true },
    data_registro: { type: Date, required: true },
    descricao: { type: String, required: false }, //não obrigatório
}, {
    timestamps: true // cria automaticamente campos "createdAt" e "updatedAt"
});

// Exportando o modelo baseado no schema para ser usado em outras partes do código

const Emprestimo = mongoose.model("Emprestimo", EmprestimoSchema);
export default Emprestimo;