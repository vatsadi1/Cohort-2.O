const mongoose = require('mongoose');

async function DataBaseConnection (){
 await mongoose.connect( process.env.MONGODB_URL )
 console.log("Database Connected");
}
 

module.exports = DataBaseConnection;