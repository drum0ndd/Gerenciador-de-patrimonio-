import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
        required: true,
        select: false,
    }
});

UserSchema.pre("save", function(next) {
    this.password = bcryopt.hash(this.password);
}

const User = mongoose.model("User", UserSchema);
export default User;