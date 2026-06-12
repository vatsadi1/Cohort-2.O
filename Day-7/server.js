require('dotenv').config();
const mongoose  = require('mongoose');
const app = require('./src/app');
const DataBaseConnection = require('./src/config/database');
const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('Hello World');
})



// mongodb connection
DataBaseConnection();



app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})