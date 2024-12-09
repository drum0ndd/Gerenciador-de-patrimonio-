import EmprestimoService from '../services/Emprestimo.service.js';
import userService from '../services/user.service.js';
import EspacoUFSCService from "../services/EspacoUFSC.service.js";
import PatrimonioService from '../services/Patrimonio.Service.js';

const create = async (req, res) => {
    try {

        console.log(req.body);

        const { 
            espacoUFSC, 
            matricula_professor, 
            matricula_aluno, 
            codigo_patrimonio, 
            data_registro,  
            descricao 
        } = req.body;

        if (!espacoUFSC || !matricula_professor || !matricula_aluno || !codigo_patrimonio || !data_registro) {
            return res.status(400).json({ message: "Com exceção de descrição, todos os outros campos são obrigatórios." });
        }

        const existingEmprestimo = await EmprestimoService.findByIdService(codigo_patrimonio);
        if (existingEmprestimo) {
            return res.status(400).json({ message: "Emprestimo já cadastrado." });
        }


        const validProfessor = await userService.isUserProfessorByMatricula(matricula_professor);
        if (!validProfessor) {
            return res.status(400).send({ message: "O usuário informado não é um professor. É necessário ser um professor responsável pela unidade para cadastrar um empréstimo." });
        }

        const validAluno = await userService.isUserProfessorByMatricula(matricula_aluno);
        if (validAluno) {
            return res.status(400).send({ message: "O usuário informado não é um aluno." });
        }


        const validEspacoUFSC = await EspacoUFSCService.findByIdService(espacoUFSC);
        if (!validEspacoUFSC) {
            return res.status(404).send({ message: "Espaço UFSC não encontrado no banco de dados." });
        }

        const validPatrimonio = await PatrimonioService.findByIdService(codigo_patrimonio);
        if (!validPatrimonio) {
            return res.status(404).send({ message: "Patrimônio não encontrado no banco de dados." });
        }

    
        const emprestimo = await EmprestimoService.createEmprestimo(req.body);

        if (!emprestimo) {
            return res.status(500).json({ message: "Falha ao criar empréstimo." });
        }

        await EmprestimoService.adiciona_dados_emprestimoService(req.body, emprestimo);

        res.status(201).send(emprestimo);

    } catch (err) {
        console.error("Erro ao criar empréstimo:", err);
        res.status(500).send({ message: "Erro interno no servidor. Tente novamente mais tarde." });
    }
};

    
    const findAllByEspacoUFSC = async (req, res) => {
        try {
            const { espacoUFSC } = req.params; // Obtendo o parâmetro da URL
            const emprestimos = await EmprestimoService.findAllByEspacoUFSCService(espacoUFSC);

            if (!emprestimos || emprestimos.length === 0) {
                return res.status(404).send({ message: "Não há empréstimos cadastrados para o espaço especificado." });
            }

            res.status(200).send(emprestimos);
        } catch (error) {
            res.status(500).send({ message: "Erro ao buscar os empréstimos.", error: error.message });
        }
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

    const addAluno = async (id, aluno) => {
        const emprestimo = await EmprestimoService.findByIdService(id);
        if (!emprestimo) {
            throw new Error("Emprestimo não encontrado no banco de dados.");
        }
        emprestimo.aluno.push(aluno);
        await emprestimo.save();
    };

    
export default {
        create,
        findAllByEspacoUFSC,
        findById,
        DeleteEmprestimobyId,
        EmprestimoByUserAluno,
        addAluno,
        
};