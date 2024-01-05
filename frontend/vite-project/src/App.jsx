/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import './App.css'
import { CreateTodo } from './components/createTodo'
import { Todos } from './components/Todos'

 function App() {
  const [todos, setTodos]= useState([]);
      useEffect(()=>{
          fetch("http://localhost:3000/todos").then(async(res)=>{
             const response= await res.json();
             setTodos(response.todos);
         });
      },[])
      
      return (
      <div>
        <h1 style={{
           textAlign: "center",
           marginTop: 80
        }}>TODO APP</h1>
         <CreateTodo todos={todos} setTodos={setTodos}></CreateTodo>
         <Todos todos={todos} setTodos={setTodos}></Todos>
      </div>
    )
}

export default App
