import mongoose from "mongoose";
import User from "../Models/User.js";
import Patrimonio from "../Models/Patrimonio.js";

// Definindo o schema do patrimônio
const EmprestimoSchema = new mongoose.Schema({
    id: { type: String, required: true },
    unidade: { type: String, required: true },
    professor: { type: Object, User, required: true },
    aluno: { type: Object, User, required: true },
    patrimonio: { type: Object, Patrimonio, required: true },
    dataAquisicao: { type: Date, required: true },
    dataRetorno: { type: Date, required: true },
    descricao: { type: String, required: false }, //não obrigatório
}, {
    timestamps: true // cria automaticamente campos "createdAt" e "updatedAt"
});

// Exportando o modelo baseado no schema para ser usado em outras partes do código

const Emprestimo = mongoose.model("Emprestimo", EmprestimoSchema);
export default Emprestimo;