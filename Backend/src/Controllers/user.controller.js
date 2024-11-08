const { default: mongoose } = require("mongoose");
const userService = require("../services/user.service");

const create = async (req, res) => {
  const { nome, sigla_curso, matricula, tipo_egresso, senha } = req.body;

  if (!nome || !sigla_curso || !matricula || !senha || !tipo_egresso) {
    res.status(400).json({ message: "All fields are required" });
  }

  if (userService.findAllService({matricula})) {
    return res.status(400).json({ message: "Usuário já cadastrado"});
    }

  const user = await userService.createService(req.body);

  if (!user) {
    return res.status(400).json({ message: "Failed to create user" });
  }

  res.status(201).send({
    message: "User created",
    user: {
      id: user._id,
      nome,
      sigla_curso,
      matricula,
      tipo_egresso,
      senha,
    },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAllService();

  if (users.length === 0) {
    return res.status(404).send({ message: "Não há usuários cadastrados" });
  }
  res.send(users);
};

const findById = async (req, res) => {
  const id = req.params.id;
  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
};

const DeleteUserbyId = async (req, res) => {
    const id = req.params.id;
    const user = await userService.findByIdService(id);

    if (!user) {
        return send.status(404).send({ message: "Usuário não encontrado no banco de dados"});
    }

    await userService.DeleteService(id);
    res.send({ message: "Usuário deletado com sucesso"});
};

const UpdateUserById = async (req, res) => {
  const { nome, sigla_curso, matricula, tipo_egresso, senha } = req.body;

  if (!nome && !sigla_curso && !matricula && !senha && !tipo_egresso) {
    res.status(400).json({ message: "All fields are required" });
  }

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Id inválido"});
  }

  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(400).send({ message: "User não encontrado"});
  }

  await userService.UpdateService(
    id,
    nome,
    sigla_curso, 
    matricula, 
    tipo_egresso,
    senha
  );

  res.send({ message: "Usuário atualizado com sucesso!"});
};

module.exports = { 
  create, 
  findAll, 
  findById, 
  DeleteUserbyId, 
  UpdateUserById
};
