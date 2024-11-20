import EspacoUFSCService from "../services/espacoUFSC.service.js";
import { isProfessor } from "../middlewares/global.middlewares.js";

const Create = async (req, res) => {

    try{ const {
            id_espaco,
            nome,
            descricao,
            matricula_responsavel,
            lista_patrimonio, // não é obrigatório
            lista_participantes
        } = req.body;

        if (
            !id_espaco|| 
            !nome|| 
            !descricao|| 
            !matricula_responsavel)  {
            return res.status(400).json({message: "Preencha todas as informações!"});
        };

        // Valida o professor
        try {
            await isProfessor(matricula_responsavel);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const existingEspacoUFSC = await EspacoUFSCService.findAllService();
        if (existingEspacoUFSC.some(EspacoUFSC => EspacoUFSC.id_espaco === id_espaco)) {
            return res.status(400).json({ message: "Espaço UFSC já cadastrado" });
        };

        const EspacoUFSC = await EspacoUFSCService.CreateService(req.body);

        console.log(EspacoUFSC);

        if (!EspacoUFSC) {
            return res.status(400).json({ message: "Falha ao criar novo espaço UFSC" });
        }

        res.status(201).send({
            message: "Novo espaco UFSC foi criado!",
            EspacoUFSC: {
                id_espaco: EspacoUFSC._id,
                nome, 
                descricao,
                matricula_responsavel,
                lista_patrimonio,
            },

                EspacoUFSC,
                lista_participantes: [...lista_participantes, matricula_responsavel]
            });

        
        } catch (err) {;
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    const EspacoUFSC = await EspacoUFSCService.findAllService();

    if (EspacoUFSC.length === 0) {
        return res.status(404).send({ message: "Não há espaços cadastrados" });
    }
    res.send(EspacoUFSC);
};

const findById = async (req, res) => {
    const id_espaco = await req.espacoUFSC;
    if (!id_espaco) {
        return res.status(404).send({ message: "preencha o id que desejas." });
    }

    const existingEspacoUFSC = await EspacoUFSCService.findByIdService(id_espaco);
    if (!existingEspacoUFSC) {
        return res.status(404).send({ message: "Espaco UFSC não encontrado no banco de dados." });
    }

    res.send(existingEspacoUFSC);

};

const DeleteEspacoUFSCbyId = async (req, res) => {
    const id_espaco = req.params.id;
    const EspacoUFSC = await EspacoUFSCService.findByIdService(id_espaco);

    if (!EspacoUFSC) {
        return res.status(404).send({ message: "Espaço não encontrado no banco de dados"});
    }

    await EspacoUFSCService.DeleteEspacoUFSCbyId(id_espaco);
    res.send({ message: "Espaço deletado com sucesso"});
};

const UpdateEspacoUFSCById = async (req, res) => {
    const {
        id_espaco,
        nome,
        descricao,
        matricula_responsavel,
        lista_patrimonio,
        lista_participantes,
    } = req.body;

    if (
        !id_espaco||
        !nome|| 
        !descricao|| 
        !matricula_responsavel|| 
        !lista_participantes
    ){
        res.status(400).json({message: "Preencha todas as informações!"});
    };
    
    const id = req.params.id;

    const EspacoUFSC = await EspacoUFSCService.findByIdService(id);

    await EspacoUFSCService.UpdateService(
        id_espaco,
        nome,
        descricao,
        matricula_responsavel,
        lista_patrimonio,
        lista_participantes,
    );

    res.send({ message: "Espaço UFSC atualizado com sucesso" });
};

export default {
    Create,
    findAll,
    findById,
    DeleteEspacoUFSCbyId,
    UpdateEspacoUFSCById
};