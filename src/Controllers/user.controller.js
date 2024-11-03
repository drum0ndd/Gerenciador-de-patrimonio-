const create = (req, res) => {
    const user = req.body;

    res.json("Hello")

    console.log(user);
};

module.exports = {create};
