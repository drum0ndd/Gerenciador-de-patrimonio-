import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    matricula: { 
        type: Number, 
        required: true,
        unique: true
    },
    tipo_egresso: { 
        type: Number, 
        required: true 
    },
    senha: {
        type: String,
        required: true,
        select: false,
    }
});


//isso aqui salva o hash da senha no banco de dados de forma encriptada
UserSchema.pre("save", async function(next) {
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
});

const User = mongoose.model("User", UserSchema);
export default User;