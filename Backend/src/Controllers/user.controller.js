import userService from "../services/user.service.js";


const create = async (req, res) => {
  try { const { nome, matricula, tipo_egresso, senha } = req.body;

  if (!nome || !matricula || !senha || !tipo_egresso) {
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

  let { limit, offset } = req.query;

  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 10;
  }

  if (!offset) {
    offset = 0;
  }

  const users = await userService.findAllService(offset, limit);
  const total = await userService.contauserService();

  // Paginação de fato dos usuarios
  const next = offset + limit;
  const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl = previous !== null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;


  if (users.length === 0) {
    return res.status(404).send({ message: "Não há usuários cadastrados" });
  }

  //Retorna além dos usuários, as informações de paginação para o cliente (froontend)
  res.send({
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: users.map(userItem => ({
      id: userItem._id,
      nome: userItem.nome,
      matricula: userItem.matricula,
      tipo_egresso: userItem.tipo_egresso,
    }))
  });
};

const findById = async (req, res) => {
  try {
    const user = await req.user;
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado no banco de dados" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

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

// TO DO: Implementar a AUTORIZAÇÃO DE ATUALIZAÇÃO de usuário APENAS PASSANDO A SENHA ANTIGA
const UpdateUserById = async (req, res) => {
  const { nome, senha, sigla_curso } = req.body;

  const id = req.params.id;

  if (!nome && !senha && !sigla_curso) {
    return res.status(400).json({ message: "Informe ao menos um campo para atualizar." });
  }
  

  const user = await userService.findByIdService(id);
  

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }
  
  const updateData = {};
  if (nome) updateData.nome = nome;
  if (senha) updateData.senha = senha;
  if (sigla_curso) updateData.sigla_curso = sigla_curso;
  
  await userService.UpdateService(id, updateData);

  res.send({ message: "Usuário atualizado com sucesso!"});
};

export default { 
  create, 
  findAll, 
  findById, 
  DeleteUserbyId, 
  UpdateUserById
};
