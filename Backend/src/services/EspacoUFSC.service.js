const EspacoUFSC = require("../Models/EspacoUFSC");

const CreateService = (body) => EspacoUFSC.create(body);

const findAllService = () => EspacoUFSC.findAll();

const findByIdService = (id) => EspacoUFSC.findById(id);

const DeleteEspacoUFSCbyId = (id) => E





module.exports = {
    CreateService
}