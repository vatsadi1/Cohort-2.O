 
 const express = require('express');

 const app = express()

 app.use(express.json())
 const PORT = 3000

 const data = [
]
console.log(data)
 app.get("/",(req,res)=>{
   res.send("server is running")
 })

app.post("/notes",(req,res)=>{
   data.push(req.body)
   res.send("notes created")
})
 
app.get("/notes",(req,res)=>{
   res.send(data)
   

})

 app.listen(PORT,(req,res)=>{
console.log(`server started at ${PORT}`)
 })