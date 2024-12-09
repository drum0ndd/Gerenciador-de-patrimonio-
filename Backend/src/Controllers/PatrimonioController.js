import PatrimonioService from '../services/Patrimonio.Service.js';
import EspacoUFSCService from '../services/EspacoUFSC.service.js';

const create = async (req, res) => {
    try { const{ codigo_patrimonio, nome, id_espacoUFSC, responsavel_espacoUFSC, estado, dataRegistro, descricao } = req.body;


    if (!codigo_patrimonio && !nome && !id_espacoUFSC && !responsavel_espacoUFSC && !estado && !dataRegistro && !descricao) {
        return res.status(400).json({message: "Todos os campos são obrigatórios"});
    }

    const existingPatrimonio = await PatrimonioService.findAllService();

    const espacoUFSC = await EspacoUFSCService.findByIdService(id_espacoUFSC);

    if (!espacoUFSC) {
        return res.status(404).send({message: "Espaço UFSC não encontrado no banco de dados"});
    }

    if (existingPatrimonio.some(
        patrimonio => patrimonio.nome === nome 
        && patrimonio.id_espacoUFSC === id_espacoUFSC 
        && patrimonio.descricao === descricao)) {
        return res.status(400).json({message: "Patrimônio já cadastrado"});
    }

    const patrimonio = await PatrimonioService.createPatrimonio(req.body);

    EspacoUFSCService.addPatrimonio(id_espacoUFSC, patrimonio);

    res.status(201).send(patrimonio);


} catch (error) {
    res.status(500).json({ message: 'Erro ao criar patrimônio', error: error.message });
}
};


const findAll = async (req, res) => {
    const patrimonio = await PatrimonioService.findAllService();

    if (patrimonio.length === 0) {
        return res.status(404).send({message: "Não há patrimônios cadastrados"});
    }
    res.send(patrimonio);
};

const DeletePatrimonio = async (req, res) => {
    const id = req.params.id;
    const patrimonio = await PatrimonioService.findByIdService(id);

    if (!patrimonio) {
        return res.status(400).json({message: "Falha ao criar patrimônio"});
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

const FindById = async (req, res) => {
    const id = req.params.id;
    const patrimonio = await PatrimonioService.findByIdService(id);

    if (!patrimonio) {
        return res.status(404).send({message: "Patrimônio não encontrado no banco de dados"});
    }

    res.send(patrimonio);
};

export default {
    create,
    findAll,
    DeletePatrimonio,
    UpdatePatrimoniobyId,
    FindById,
};