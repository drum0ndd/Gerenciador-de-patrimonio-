import EspacoUFSCService from "../services/espacoUFSC.service.js";
import { isProfessor } from "../middlewares/global.middlewares.js";
import EspacoUFSCService from "../services/EspacoUFSC.service.js";
import userService from "../services/user.service.js";



const Create = async (req, res) => {
    try {
        const {
            nome,
            descricao,
            matricula_responsavel,
            lista_patrimonios = [], // Valores padrão
            lista_participantes = [],
        } = req.body;

        // Validação dos campos obrigatórios
        if (!nome || !descricao || !matricula_responsavel) {
            return res.status(400).json({ message: "Preencha todas as informações obrigatórias!" });
        }

        // Valida se a matrícula é de um professor
        try {
            await isProfessor(matricula_responsavel);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        // Verifica duplicidade do nome no banco
        const existingEspacoUFSC = await EspacoUFSCService.findAllService();
        if (existingEspacoUFSC.some(EspacoUFSC => EspacoUFSC.nome === nome
            && EspacoUFSC.matricula_responsavel === matricula_responsavel
        )) {
            return res.status(400).json({ message: "Espaco UFSC já cadastrado"});
            }

        // Cria o novo espaço
        const EspacoUFSC = await EspacoUFSCService.CreateService({
            nome,
            descricao,
            matricula_responsavel,
            lista_patrimonios,
            lista_participantes,
        });

        if (!EspacoUFSC) {
            return res.status(400).json({ message: "Falha ao criar novo espaço UFSC." });
        }

        const existingProfessor = await userService.findAllService();
        if (existingProfessor.some(user => user.matricula === matricula_responsavel)) {
            EspacoUFSC.lista_participantes.push(professor._id);
        }

        // Retorna o sucesso
        res.status(201).send({
            message: "Novo espaço UFSC foi criado! Professor adicionado como participante.",
            espacoUFSC: EspacoUFSC, // Retorna o documento criado
        });


    } catch (err) {
        console.error("Erro ao criar Espaço UFSC:", err); // Log para debug
        res.status(500).send({ message: "Erro interno no servidor. Tente novamente mais tarde.", error: err.message });
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

//fazer essa função
const findEspacobyMatricula = async (req, res) => {
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

const addEmprestimo = async (espacoUFSC, emprestimoId) => {
    const valid_espacoUFSC = await espacoUFSCService.findAllService();
    if (!valid_espacoUFSC.some(espacoUFSC => espacoUFSC.espacoUFSC !== espacoUFSC)) {
        return res.status(404).send({ message: "Espaço UFSC não encontrado no banco de dados" });
    }
    if (!Array.isArray(espacoUFSC.emprestimos)) {
        espacoUFSC.emprestimos = [];
    }
    espacoUFSC.emprestimos.push(emprestimoId);
    await espacoUFSC.save();
};


const addAluno = async (espacoUFSC, matricula, res) => {
    try {
        if (!res || typeof res.status !== 'function') {
            throw new Error('Objeto res não foi passado corretamente');
        }

        const valid_espacoUFSC = await espacoUFSCService.findAllService();
        const espaco = valid_espacoUFSC.find(item => item.espacoUFSC === espacoUFSC);

        if (!espaco) {
            return res.status(404).send({ message: "Espaço UFSC não encontrado no banco de dados" });
        }

        const valid_aluno = await userService.findAllService();
        const aluno = valid_aluno.find(aluno => aluno.matricula === matricula && aluno.tipo !== "2");

        if (!aluno) {
            return res.status(404).send({ message: "Aluno não encontrado ou não autorizado" });
        }

        if (espaco.lista_participantes.includes(aluno._id)) {
            return res.status(400).send({ message: "Aluno já está adicionado ao espaço" });
        }

        espaco.lista_participantes.push(aluno._id);
        await espaco.save();

        return res.send({ message: "Aluno adicionado com sucesso" });


    } catch (error) {
        console.error("Erro ao adicionar aluno:", error);
        return res.status(500).send({ message: "Erro interno no servidor", error: error.message });
    }
};




export default {
    Create,
    findAll,
    findById,
    DeleteEspacoUFSCbyId,
    UpdateEspacoUFSCById,
    addEmprestimo,
    addAluno,  
};