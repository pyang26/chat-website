import React, { useState } from "react";
import { auth, db } from "../firebase";
import TodoItem from "./TodoItem";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
function TodoList() {
    const [tasks, setTasks] = useState([
    {
    id: 1,
    text: 'Sample Item',
    completed: false
    },
    ]);
    
    const [text, setText] = useState('');
    const sendTask = async (event) => {
        event.preventDefault();
        const newTask = {
            id: Date.now(),
            text,
            completed: false
            };
    
        const { uid, displayName, photoURL } = auth.currentUser;
    
        // Send user's message to Firebase
        await addDoc(collection(db, "tasks"), {
          text: tasks,
          createdAt: serverTimestamp(),
          uid,
        });
        setTasks([...tasks, newTask]);
        setText('');
      };
      /*
   function addTask(text) {
    const newTask = {
    id: Date.now(),
    text,
    completed: false
    };
    setTasks([...tasks, newTask]);
    setText('');
    
    }*/
   function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
    }
   function toggleCompleted(id) {
    setTasks(tasks.map(task => {
    if (task.id === id) {
    return {...task, completed: !task.completed};
    } else {
    return task;
    } 
    }));
    }
   return (
    <form onSubmit={sendTask}>
    <div className="todo-list">
    {tasks.map(task => (
    <TodoItem
    key={task.id} 
    task={task}
    deleteTask={deleteTask}
    toggleCompleted={toggleCompleted} 
    />
    ))}
    <div className="todo-list">
   <input
    value={text}
    onChange={e => setText(e.target.value)} 
    />
   <button className="todo-button" type="submit" >Add</button>
   </div>
    </div>
    </form>
    );
   }
   export default TodoList;