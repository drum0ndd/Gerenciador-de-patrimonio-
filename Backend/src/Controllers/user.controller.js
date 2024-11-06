const create = async (req, res) => {
    const {name, username, matricula, password} = req.body;

    if (!name || !username || !matricula || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }


    res.status(201).send({
        message: 'User created',
        user: {
            name,
            username,
            matricula
        },
    });   
};

module.exports = {create};