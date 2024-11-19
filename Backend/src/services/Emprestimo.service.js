import Emprestimo from '../models/Emprestimo.js';

const createEmprestimo = (body) => Emprestimo.create(body);

const findAllService = () => Emprestimo.find();

const findByIdService = (id) => Emprestimo.findById(id);

const DeleteService = (id) => Emprestimo.findByIdAndDelete(id);


export default {
    createEmprestimo,
    findAllService,
    findByIdService,
    DeleteService,
};