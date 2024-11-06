const mongoose = require("mongoose");

const connectdatabase = () => {
  console.log("Waiting to connect the Database");

  mongoose.connect(
    "mongodb+srv://arthurprodrigues1:root@gerenciadordepatrimonio.csroj.mongodb.net/",
    { useNewURLParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Atlas is connected."))  
    .catch((error) => console.log(error))

};

module.exports = connectdatabase;
