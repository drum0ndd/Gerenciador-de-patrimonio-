const User = require('../Models/User');

const create = (body) => User.create(body);

module.exports = {
    create
};  