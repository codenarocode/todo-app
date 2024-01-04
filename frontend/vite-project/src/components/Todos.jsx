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
             </div>
          })}
     </div>
}


function ComplitionButton({todo,todos,setTodos}){
    
    function toggleButton(){
       
        //update in database
         
         

       //update state
      
       setTodos(todos.map((todoo) => {
          if (todoo.title === todo.title && todoo.description===todo.description) {
            
             return {...todoo,completed:!todo.completed};
             
          }
          return todoo; 
        }));

    }
    return <button style={{
        backgroundColor : todo.completed ? "lightgreen" :"#FF6347",
        margin:2,
        padding :5,
        width: 325,
        cursor: "pointer"
    }} onClick={toggleButton}>{todo.completed==true? "Completed" : "Mark as completed"}</button>
}