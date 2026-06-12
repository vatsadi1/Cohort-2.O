import mongoose  from "mongoose";

const DbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)  
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed", err);
        throw err; // Rethrow the error to be handled in server.js
    }   
}

export default DbConection;