const express = require('express');
const connectDatabase = require("./Backend/src/database/db.js")
const userRoute = require('./Backend/src/routes/user.route.js');

const app = express();
const port = 3000;

connectDatabase()
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});