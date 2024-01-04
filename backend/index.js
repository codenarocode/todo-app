
const express= require("express");
const app= express();
const {createTodo} = require("./types");
const {updateTodo} = require("./types");
const {Todo} = require("./db");

app.use(express.json());


app.post("/todo", async (req,res)=>{
      const validation= createTodo.safeParse(req.body);
      if(!validation.success){
         res.status(411).json({
            msg : "you sent the invalid input"
         })
      }
      await Todo.create({
            title: req.body.title,
            description: req.body.description,
            completed: false
      });

      res.json({
        msg: "Todo created"
      })
});

app.get("/todos",async (req,res)=>{
    const todos= await Todo.find({});
     res.json({
        todos
     })
});

app.put("/completed", async(req,res)=>{
     const validation= updateTodo.safeParse(req.body);
     if(!validation.success){
        res.status(411).json({
           msg : "you sent the invalid input"
        })
     }
     await Todo.updateOne({ title : req.body.title},{$set : {completed: true}});
     res.json({
        msg: "Todo updated"
     })
});

app.listen(3000,()=>{
    console.log("App is running on port 3000");
})