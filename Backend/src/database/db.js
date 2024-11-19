import mongoose from "mongoose";

const connectdatabase = () => {
  console.log("Waiting to connect the Database");

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Atlas is connected."))  
    .catch((error) => console.log(error))

};

export default connectdatabase;
