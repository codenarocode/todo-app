
const express= require("express");
const app= express();
const {createTodo, deleteTodo} = require("./types");
const {updateTodo} = require("./types");
const {Todo} = require("./db");
const cors = require("cors");
app.use(express.json());
app.use(cors());

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
        });  
     }
     else{
     const completed=req.body.completed;
     await Todo.updateOne({ title : req.body.title},{$set : {completed}});
     res.json({
        msg: "Todo updated"
     });
   }
});

app.delete("/delete",async(req,res)=>{
     const validation= deleteTodo.safeParse(req.body);
     if(!validation.success){
       res.status(411).json({
         msg : "you sent invalid input"
       });
     }
     else{
         await Todo.deleteOne({title: req.body.title});
         res.json({
            msg: "Todo deleted"
         });
     }
})

app.listen(3000,()=>{
    console.log("App is running on port 3000");
})