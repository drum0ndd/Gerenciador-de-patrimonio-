const userService = require('../services/user.service');

const create = async (req, res) => {
    const {nome, sigla_curso, matricula, tipo_egresso, senha} = req.body;

    if (
        !nome || 
        !sigla_curso || 
        !matricula || 
        !senha ||
        !tipo_egresso
    ) 
    {
        return res.status(400).json({message: 'All fields are required'});
    }

    const user = await userService.create(req.body);

    if (!user) {
        return res.status(500).json({message: 'Failed to create user'});
    }


    res.status(201).send({
        message: 'User created',
        user: {
            id: user._id,
            nome,
            sigla_curso,
            matricula,
            tipo_egresso,
            senha
        },
    });   
};

module.exports = {create};