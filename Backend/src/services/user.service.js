import User from "../Models/User.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const DeleteService = (id) => User.findByIdAndDelete(id);

const UpdateService = (id, nome, sigla_curso, matricula, tipo_egresso, senha) => User.findOneAndUpdate(
    { _id: id },
    { nome, sigla_curso, matricula, tipo_egresso, senha }
)

export default {
  createService,
  findAllService,
  findByIdService,
  DeleteService,
  UpdateService,
};
