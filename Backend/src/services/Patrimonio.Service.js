import Patrimonio from '../Models/Patrimonio.js';

const createPatrimonio = (body) => Patrimonio.create(body);

const findAllService = () => Patrimonio.find();

const findByIdService = (id) => Patrimonio.findById(id);

const DeleteService = (id) => Patrimonio.findByIdAndDelete(id);

const UpdateService = (id, nome, unidade, estado, dataRegistro, descricao) => 
    Patrimonio.findOneAndUpdate(
        {_id: id},
        {nome, unidade, estado, dataRegistro, descricao}
    );

export default {
    createPatrimonio,
    findAllService,
    findByIdService,
    DeleteService,
    UpdateService,
};