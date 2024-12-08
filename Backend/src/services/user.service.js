import User from "../Models/User.js";
import mongoose from "mongoose";

const createService = (body) => User.create(body);

const findAllService = (offset, limit) => User.find().sort({_id: -1}).skip(offset).limit(limit);

const contauserService = () => User.countDocuments();

async function findByIdService(id) {
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
  }
  return await User.findById(id);
}
const DeleteService = (id) => User.findByIdAndDelete(id);

const UpdateService = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

async function isUserProfessorByMatricula(matricula) {
  // Verifica se existe um usuário com a matrícula e tipo_egresso igual a 2
  const user = await User.findOne({ matricula, tipo_egresso: 2 });
  return !!user; // Retorna true se o usuário existe, caso contrário false
}


export default {
  createService,
  findAllService,
  findByIdService,
  DeleteService,
  UpdateService,
  isUserProfessorByMatricula,
  contauserService,
};
