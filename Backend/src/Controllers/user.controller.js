import userService from "../services/user.service.js";


const create = async (req, res) => {
  try {const { nome, sigla_curso, matricula, tipo_egresso, senha } = req.body;

  if (!nome || !sigla_curso || !matricula || !senha || !tipo_egresso) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const existingUser = await userService.findAllService();
  if (existingUser.some(user => user.matricula === matricula)) {
    return res.status(400).json({ message: "Usuário já cadastrado"});
    }
  
  //Criação de fato do usuário
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
} catch (err) {
    res.status(500).send({ message: err.message });
}

}
;

const findAll = async (req, res) => {
  const users = await userService.findAllService();

  if (users.length === 0) {
    return res.status(404).send({ message: "Não há usuários cadastrados" });
  }
  res.send(users);
};

const findById = async (req, res) => {
  const user = await req.user;
  if (!user) {
    return res.status(404).send({ message: "Usuário não encontrado no banco de dados" });
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
    res.status(400).json({ message: "Todos os campos são necessários." });
  }

  const id = req.params.id;

  const user = await userService.findByIdService(id);

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

export default { 
  create, 
  findAll, 
  findById, 
  DeleteUserbyId, 
  UpdateUserById
};
