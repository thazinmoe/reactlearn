import React, { useContext } from "react";
import { TodosContext } from "./context/TodosContext";

 const  Task = () => {

    const { todos, setTodo } = useContext(TodosContext);

    function markAsEditing(id){
      const updateTodos = todos.map((todo) => {
        if(todo.id === id){
          todo.isEditing = true;
        }
        return todo;
      });
      setTodo(updateTodos);
      console.log("mark")
    }

    function updateTodo(event,id){
      const updateTodos = todos.map((todo)=> {
        if(todo.id === id){
          if(event.target.value.trim().length === 0){
            todo.isEditing = false;
            return todo;
          }
          todo.title = event.target.value;
          todo.isEditing = false;
        }
        return todo;
      });
      setTodo(updateTodos);
    }

    function cancelTodo(event, id){
      const updateTodos = todos.map((todo) => {
        if(todo.id === id){
          todo.isEditing = false;
        }
        return todo;
      });
      setTodo(updateTodos);
      console.log("cancel");
    }

    function completeTodo(id){
      const updateTodos = todos.map((todo) => {
        if(todo.id === id){
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      });
      setTodo(updateTodos);
      console.log("completeTodo",todos);
    }

    function deleteTodo(id){
      console.log(id);
        setTodo([...todos].filter(todo => todo.id !== id));
        console.log("deleteTodo",id)
    }
    return(
        <ul>
            {todos.map((todo,index) => {
                return(
                    <li  key={index}>
                      <input
                        type="checkbox"
                        onChange={() => completeTodo(todo.id)}
                        checked={todo.isComplete ? true : false }
                      />
                      {!todo.isEditing ? (
                        <span
                        onDoubleClick={()=> markAsEditing(todo.id)}
                        style={{textDecoration: todo.isComplete? 'line-through' : 'none'}}
                      >
                        {todo.title}
                      </span>
                      ) : (
                        <input 
                          type="text"
                          onBlur={(event) => updateTodo(event,todo.id)}
                          onKeyDown={(event) => {
                            if(event.key === 'Enter'){
                              updateTodo(event,todo.id);
                            }else if(event.key === 'Escape'){
                              cancelTodo(event, todo.id)
                            }
                          }}
                          defaultValue={todo.title}
                          autoFocus
                        />
                      )}
                    <button onClick={() => deleteTodo(todo.id)}>X</button>
                  </li>
                );
            })}
        </ul>
    );
}

export default Task;