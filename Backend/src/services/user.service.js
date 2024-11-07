const User = require('../Models/User');

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const DeleteService = (id) => User.findByIdAndDelete(id);


module.exports = {
    createService,
    findAllService,
    findByIdService,
    DeleteService
};  