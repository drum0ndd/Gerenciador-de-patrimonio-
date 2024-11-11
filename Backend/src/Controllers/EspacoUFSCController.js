const { create } = require("../Models/User");
const EspacoUFSCService = require("../services/user.service");

const Create = async (req, res) => {

    const {
        nome,
        descricao,
        responsavel,
        patrimonio,
    } = req.body;

    if (!nome|| 
        !descricao|| 
        !responsavel|| 
        !patrimonio
    ){
        res.status(400).json({message: "Preencha todas as informações!"});
    };
    
    if (EspacoUFSCService.findAllService({ nome }) && 
    EspacoUFSCService.findAllService({ responsavel })) {
        return res.status(400).json({ message: "Espaço já cadastrado"});
    }

    res.status(201).send({
        message: "Novo espaco UFSC foi criado!",
        EspacoUFSC: {
            id: EspacoUFSC._id,
            nome, 
            descricao,
            responsavel,
            patrimonio
        },
    });
};

const findAll = async (req, res) => {
    const EspacoUFSC = await EspacoUFSCService.findAllService();

    if (EspacoUFSC.length === 0) {
        return res.status(404).send({ message: "Não há espaços cadastrados" });
    }
    res.send(EspacoUFSC);
};

const findById = async (req, res) => {
    const id = req.id; //vindo do global middleware.

    const EspacoUFSC = await EspacoUFSCService.findByIdService(id);

    res.send(EspacoUFSC);
};

const DeleteEspacoUFSCbyId = async (req, res) => {
    const id = req.params.id;
    const EspacoUFSC = await EspacoUFSCService.findByIdService(id);

    if (!EspacoUFSC) {
        return send.status(404).send({ message: "Espaço não encontrado no banco de dados"});
    }

    await EspacoUFSCService.DeleteService(id);
    res.send({ message: "Espaço deletado com sucesso"});
};

const UpdateEspacoUFSCById = async (req, res) => {
    const {
        nome,
        descricao,
        responsavel,
        patrimonio,
    } = req.body;

    if (!nome|| 
        !descricao|| 
        !dataCriacao|| 
        !responsavel|| 
        !patrimonio
    ){
        res.status(400).json({message: "Preencha todas as informações!"});
    };
    
    const id = req.params.id;



}


module.exports = {
    Create,
    findAll,
    findById,
    DeleteEspacoUFSCbyId,
    UpdateEspacoUFSCById
};