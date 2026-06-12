require('dotenv').config()
const app = require("./src/app.js")
const connectDB = require('./src/config/database.js')
const PORT = 3000

async function start() {
    try{
await connectDB()

const server = app.listen(PORT,()=>{
console.log("running on",PORT)
})
server.on("error",(err)=>{
    console.log(err);
    process.exit(1);

})
    }catch(err){
    console.log("startup faild",err)
    process.exit(1);
}
}

start()