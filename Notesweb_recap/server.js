require('dotenv').config();
const app = require("./src/app.js")

const PORT = process.env.PORT || 3000


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on ${PORT}`)
})