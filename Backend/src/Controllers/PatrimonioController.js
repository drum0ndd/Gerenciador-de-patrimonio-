import PatrimonioService from '../services/Patrimonio.Service.js';

const create = async (req, res) => {
    try { const{ nome, id, espacoUFSC, estado, dataRegistro, descricao } = req.body;


    if (!nome || !espacoUFSC || !estado || !dataRegistro) {
        return res.status(400).json({message: "Todos os campos são obrigatórios"});
    }

    const existingPatrimonio = await PatrimonioService.findAllService();

    if (existingPatrimonio.some(patrimonio => patrimonio.id === id)) {
        return res.status(400).json({message: "Patrimônio já cadastrado"});
    }

    const patrimonio = await PatrimonioService.createPatrimonio(req.body);

    if (!patrimonio) {
        return res.status(400).json({message: "Falha ao criar patrimônio"});
    }

    res.status(201).send({
        message: "Patrimônio criado",
        patrimonio: {
            id: patrimonio._id,
            nome,
            unidade,
            estado,
            dataRegistro,
            descricao,
        },
    });
} catch (err) {
    res.status(500).send({message: err.message});
}
}
;

const findAll = async (req, res) => {
    const patrimonio = await PatrimonioService.findAllService();

    if (patrimonio.length === 0) {
        return res.status(404).send({message: "Não há patrimônios cadastrados"});
    }
    res.send(patrimonio);
};

const DeletePatrimoniobyId = async (req, res) => {
    const id = req.params.id;
    const patrimonio = await PatrimonioService.findByIdService(id);

    if (!patrimonio) {
        return send.status(404).send({message: "Patrimônio não encontrado no banco de dados"});
    }

    await PatrimonioService.DeleteService(id);
    res.send({message: "Patrimônio deletado com sucesso"});
};

const UpdatePatrimoniobyId = async (req, res) => {
    const id = req.params.id;
    const { nome, espacoUFSC, estado, dataRegistro, descricao } = req.body;

    const patrimonio = await PatrimonioService.findByIdService(id);

    if (!patrimonio) {
        return res.status(404).send({message: "Patrimônio não encontrado no banco de dados"});
    }

    await PatrimonioService.UpdateService(id, nome, espacoUFSC, estado, dataRegistro, descricao);
    res.send({message: "Patrimônio atualizado com sucesso"});
};

export default {
    create,
    findAll,
    DeletePatrimoniobyId,
    UpdatePatrimoniobyId,
};