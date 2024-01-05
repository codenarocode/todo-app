/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";

/* eslint-disable react/jsx-key */

export function Todos({todos,setTodos}){
     return <div>
         {todos.map((todo)=>{
             return <div style={{
                marginTop:10,
                display: "flex",
                flexDirection: "column",
                border: "8px solid lightblue",
                alignItems: "center",
                width:325
             }}>
                <h2>{todo.title}</h2>
                <div style={{
                    width: 320,
                    overflow: "auto"
                }}>{todo.description}</div>
                <ComplitionButton todo={todo} todos={todos} setTodos={setTodos}></ComplitionButton>
                <DeletionButton todo={todo} todos={todos} setTodos={setTodos}></DeletionButton>
             </div>
          })}
     </div>
}

// Button component to delete that particular Todo

function DeletionButton({todo,todos,setTodos}){

    async function deleteTodo(){

        // Get Confirmation from user once more

          const response = confirm("Do you really want to delete this Todo?")
          if(!response) return;

         //delete from database

           await fetch("http://localhost:3000/delete",{
                method : "DELETE",
                body : JSON.stringify({
                    _id : todo._id
                }),
                headers : {
                    "Content-type" : "application/json"
                }
           });

         // delete from state

         setTodos(todos.filter((todoo)=>{
              if(todoo._id === todo._id){
                 return false;
              }
              else return true;
         }));
    }

    return <button style={{
        backgroundColor : "#FF6347",
        margin:2,
        padding :5,
        width: 325,
        cursor: "pointer"
    }} onClick={deleteTodo}>Delete Todo</button>
}

// Button Component to Mark as Done that particular Todo

function ComplitionButton({todo,todos,setTodos}){
    
   async function toggleButton(){
       
        //update in database
         
         await fetch("http://localhost:3000/completed",{
               method : "PUT",
               headers : {
                  "Content-type" : "application/json"
               },
               body : JSON.stringify({
                  _id : todo._id,
                  completed: !todo.completed
               })
         });

         

       //update state
      
       setTodos(todos.map((todoo) => {
          if (todoo._id === todo._id) {
            
             return {...todoo,completed:!todo.completed};
             
          }
          return todoo; 
        }));

    }
    return <button style={{
        backgroundColor : todo.completed ? "lightgreen" :"lightblue",
        margin:2,
        padding :5,
        width: 325,
        cursor: "pointer"
    }} onClick={toggleButton}>{todo.completed==true? "Completed" : "Mark as completed"}</button>
}