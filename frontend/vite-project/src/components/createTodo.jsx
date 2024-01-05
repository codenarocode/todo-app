/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react"


export function CreateTodo({todos,setTodos}){
    const [title, setTitle]=  useState("");
    const [description, setDescription]=useState("");
    async function updateTodos(){

          if(!title) return;

         // add new todo in database

         let res= await fetch("http://localhost:3000/todo",{
              method : "POST",
              body : JSON.stringify({
                 title : title,
                 description : description
              }),
              headers: {
               "Content-type" : "application/json"
              }
           });

         res= await res.json(); 
         const _id=res._id;

        // add new todo in state
        
         setTodos([...todos,{
            _id: _id,
            title : title,
            description: description,
            completed : false
         }])
         alert("Todo Added")
        
    }
       return <div>
              <input type="text" placeholder="title" style={ {
                 margin : 10,
                 padding : 10,
                 width: 300,
              }} onChange={(e)=>{
                 setTitle(e.target.value);
              }}></input>
              <br></br><br></br>
              <input type="text" placeholder="description" style={ {
                 margin : 10,
                 padding : 10,
                 width: 300
              }} onChange={(e)=>{
                 setDescription(e.target.value);
              }}></input>
              <br></br><br></br>
              <button style={ {
                 margin : 10,
                 padding : 10,
                 width: 322,
                 backgroundColor: "lightgreen",
                 cursor: "pointer"
              }} onClick={updateTodos}>Add Todo</button>
       </div>
}








