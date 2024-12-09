import Emprestimo from '../Models/Emprestimo.js';
import User from '../Models/User.js';
import {isProfessor, validEspacoUFSC} from '../middlewares/global.middlewares.js';

const createEmprestimo = (body) => Emprestimo.create(body);

const findAllService = () => Emprestimo.find();

const findByIdService = (id) => Emprestimo.findById(id);

const DeleteService = (id) => Emprestimo.findByIdAndDelete(id);

const EmprestimoByUserAlunoService = async (req, res) => {
    //PASSA ID DA SALA E ID DO ALUNO
    const aluno_matricula = req.body;
    const alunoExiste = await User.find({ aluno: aluno.aluno_matricula });
    const EspacoUFSC = await EspacoUFSC.find({ espacoUFSC: espacoUFSC.id });
    
    //valido se a sala existe
    if (!validEspacoUFSC) {
        return res.status(404).send({ message: "Espaço UFSC não encontrado no banco de dados" });
    }

    //valido se o aluno existe
    if (isProfessor) {
        return res.status(404).send({ message: "Aluno não encontrado no banco de dados" });
    }

    const matricula_aluno = Aluno.matricula;


    const emprestimosPorMAtriculaAluno = await Emprestimo.find({ matricula: matricula_aluno });
    if (!emprestimosPorMAtriculaAluno) {
        return res.status(404).send({ message: "Emprestimo não encontrado no banco de dados" });

    } else {
        return res.send(emprestimosPorMAtriculaAluno);
    }
};
const findAllByEspacoUFSCService = async (espacoUFSC) => {
    return await EmprestimoModel.find({ espacoUFSC }); // Considerando Mongoose
};

const adiciona_dados_emprestimoService = async (req, emprestimo, res) => {
    const { espacoUFSC, matricula_professor, matricula_aluno, codigo_patrimonio, data_registro, descricao } = req;

    emprestimo.espacoUFSC = espacoUFSC;
    emprestimo.matricula_professor = matricula_professor;
    emprestimo.matricula_aluno = matricula_aluno;
    emprestimo.codigo_patrimonio = codigo_patrimonio;
    emprestimo.data_registro = data_registro;
    emprestimo.descricao = descricao;

    await emprestimo.save();
}


export default {
    createEmprestimo,
    findAllService,
    findByIdService,
    DeleteService,
    EmprestimoByUserAlunoService,
    findAllByEspacoUFSCService,
    adiciona_dados_emprestimoService
};