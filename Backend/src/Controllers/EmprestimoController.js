import EmprestimoService from '../Services/Emprestimo.service.js';
import userService from '../services/user.service.js';
import all from '../middlewares/global.middlewares.js';

const create = async (req, res) => {
    try {const { 
        espacoUFSC, 
        matricula_professor, 
        matricula_aluno, 
        codigo_patrimonio, 
        data_registro,  
        descricao // não obrigatório
    } = req.body;

    if (
        !espacoUFSC || 
        !matricula_professor || 
        !matricula_aluno || 
        !codigo_patrimonio || 
        !data_registro ||
        !descricao)
        {
        return res.status(400).json({ message: "Com exceção de descrição, todos os outros campos são obrigatórios" });
    }
    

    const existingEmprestimo = await EmprestimoService.findAllByEspacoUFSCService();
    if (existingEmprestimo.some(emprestimo => emprestimo.patrimonio.id === patrimonio.id)) {
        return res.status(400).json({ message: "O patrimonio informado já foi emprestado"});
    }

    //verifica se o professor é do tipo 2:

    const validProfessor = await userService.findByIdService(matricula_professor);
    if (!validProfessor) {
        return res.status(404).send({ message: "Professor não encontrado no banco de dados" });
    }


    //criação do emprestimo
    const emprestimo = await EmprestimoService.createEmprestimo(req.body); 

    if (!emprestimo) {
        return res.status(400).json({ message: "Falha ao criar emprestimo" });
    }

    res.status(201).send({
        message: "Emprestimo criado",
        emprestimo: { 
            espacoUFSC, 
            matricula_professor, 
            matricula_aluno, 
            codigo_patrimonio, 
            data_registro,  
            descricao
        },
    });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
    
    const findAllByEspacoUFSC = async (req, res) => {
        const emprestimos = await EmprestimoService.findAllByEspacoUFSCService();

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

    const EmprestimoByUserAluno = async (req, res) => {
        const dados = req.body;

        const aluno_matricula = dados.matricula

        const existingAluno = userService.findByIdService(aluno_matricula);

        if (!existingAluno) {
            res.send("Matricula do aluno incorreta.")
        };

            //valido se a sala existe
        if (!validEspacoUFSC) {
            return res.status(404).send({ message: "Espaço UFSC não encontrado no banco de dados" });
        }

        const ExistingEmprestimoAluno = await EmprestimoService.EmprestimoByAlunoService(aluno_matricula);

        if (!aluno_matricula){
            res.status(400).send("Esse aluno não possui emprestimos.")
        }

        res.send({
            results: emprestimo.map(emprestimoItem => ({
            espacoUFSC: emprestimoItem.espacoUFSC,
            matricula_professor: emprestimoItem.professor,
            matricula_aluno: emprestimoItem.aluno,
            codigo_patrimonio: emprestimoItem.patrimonio,
            data_registro: emprestimoItem.dataAquisicao,
            descricao: emprestimoItem.descricao
    })),
    });

};
export default {
        create,
        findAllByEspacoUFSC,
        findById,
        DeleteEmprestimobyId,
        EmprestimoByUserAluno,
};