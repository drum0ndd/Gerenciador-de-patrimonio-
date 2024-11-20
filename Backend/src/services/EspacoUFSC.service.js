import EspacoUFSC from '../Models/EspacoUFSC.js';

const CreateService = (body) => EspacoUFSC.create(body);

const findAllService = () => EspacoUFSC.find();

const findByIdService = (id) => EspacoUFSC.findById(id);

const DeleteEspacoUFSCbyId = (id) => EspacoUFSC.findByIdAndDelete(id);



export default {
    CreateService,
    findAllService,
    findByIdService,
    DeleteEspacoUFSCbyId,
};