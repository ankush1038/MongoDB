const express = require("express");
const app = express();
const client = require("mongodb").MongoClient;
app.set("view engine" , "ejs");

// if localhost is not working use 127.0.0.1:27017
let dbinstance;
client.connect("mongodb://127.0.0.1:27017").then((server)=>{
    dbinstance = server.db("globe")


    console.log("Database connected");
}).catch((err)=>{
    console.log("Error in connection");
})               

app.get("/getData",(req,res)=>{
    dbinstance.collection("students").find({}).toArray().then((data)=>{
        res.render("home",{students:data});
    })
    // res.send(data);
    
})

app.get("/saveData",(req,res)=>{
    let obj ={};
    obj.name = req.query.name;
    obj.age = req.query.age;

    dbinstance.collection("students").insertOne(obj).then((response)=>{
        res.redirect("/getData");
    })
})

app.listen(3000,(err)=>{
    console.log("Server Started");
})