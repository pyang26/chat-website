import React from 'react';
function TodoItem({ task, deleteTask, toggleCompleted }) {
function handleChange() {
 toggleCompleted(task.id);
 }
 
 return (
 <div className="todo-item">
 <input 
 type="checkbox"
 checked={task.completed}
 onChange={handleChange}
 />
<p className="tasktext">{task.text}</p>
<button className="deletebutton" onClick={() => deleteTask(task.id)}>
 X
 </button>
 </div>
 );
}
export default TodoItem;