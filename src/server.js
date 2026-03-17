import express from "express"

const app = express();

app.get("/",(req,res)=>{
    res.json({
        messagge:"Api Working sucesfully",
        Status:200,
        appName:"",
        author:""
    })
})

app.listen(3000,()=>{
    console.log(`server listeing at port 3000`)
})