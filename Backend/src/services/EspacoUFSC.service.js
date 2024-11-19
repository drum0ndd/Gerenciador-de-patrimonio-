import EspacoUFSC from '../Models/EspacoUFSC.js';

const CreateService = (body) => EspacoUFSC.create(body);

const findAllService = () => EspacoUFSC.findAll();

const findByIdService = (id) => EspacoUFSC.findById(id);

const DeleteEspacoUFSCbyId = (id) => E


export default {
    CreateService,
    findAllService,
    findByIdService,
    DeleteEspacoUFSCbyId,
};