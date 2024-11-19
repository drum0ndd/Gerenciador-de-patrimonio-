import EmprestimoService from '../Services/Emprestimo.service.js';
import userService from '../services/user.service.js';

const create = async (req, res) => {
    try {const { 
        id,
        unidade, 
        professor, 
        aluno, 
        patrimonio, 
        dataAquisicao, 
        dataRetorno, 
        descricao // não obrigatório
    } = req.body;

    if (
        !id || 
        !unidade || 
        !professor || 
        !aluno || 
        !patrimonio || 
        !dataAquisicao
        ) {
        return res.status(400).json({ message: "Com exceção de descrição, todos os outros campos são obrigatórios" });
    }
    

    const existingEmprestimo = await EmprestimoService.findAllService();
    if (existingEmprestimo.some(emprestimo => emprestimo.patrimonio.id === patrimonio.id)) {
        return res.status(400).json({ message: "O patrimonio informado já foi emprestado"});
    }


    //criação do emprestimo
    const emprestimo = await EmprestimoService.createEmprestimo(req.body); 

    if (!emprestimo) {
        return res.status(400).json({ message: "Falha ao criar emprestimo" });
    }

    res.status(201).send({
        message: "Emprestimo criado",
        emprestimo: {
            id: emprestimo._id,
            unidade,
            professor,
            aluno,
            patrimonio,
            dataAquisicao,
            dataRetorno,
            descricao,
        },
    });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
    
    const findAll = async (req, res) => {
        const emprestimos = await EmprestimoService.findAllService();

        if (emprestimo.length == 0) {
            return res.status(404).send({ message: "Não há emprestimos cadastrados" });
        }

        res.send(emprestimos);
    };

    const findById = async (req, res) => {
        const emprestimo = await req.emprestimo;
        if (!emprestimo) {
            return res.status(404).send({ message: "Emprestimo não encontrado no banco de dados" });
        }
        res.send(emprestimo);
    };  

    const DeleteEmprestimobyId = async (req, res) => {
        const id = req.params.id;
        const emprestimo = await EmprestimoService.findByIdService(id);

        if (!emprestimo) {
            return send.status(404).send({ message: "Emprestimo não encontrado no banco de dados" });
        }

        await EmprestimoService.DeleteService(id);
        res.send({ message: "Emprestimo deletado com sucesso" });
    };

    

    const UpdateEmprestimobyId = async (req, res) => {
        const {nome, 
            unidade, 
            estado, 
            dataRegistro, 
            descricao} = req.body;

        if (!nome && !unidade && !estado && !dataRegistro) {
            res.status(400).json({ message: "Todos os campos são necessários." });
        }

        const id = req.params.id;

        const emprestimo = await EmprestimoService.findByIdService(id);

        await EmprestimoService.UpdateService(
            id,
            nome,
            unidade,
            estado,
            dataRegistro,
            descricao
        );

        res.send({ message: "Emprestimo atualizado com sucesso" });

    };

    export default {
        create,
        findAll,
        findById,
        DeleteEmprestimobyId,
        UpdateEmprestimobyId,
    };