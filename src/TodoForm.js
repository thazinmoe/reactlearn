import React, { useContext, useState } from "react";
import { TodosContext } from "./context/TodosContext";

function TodoForm() {
    const { todos, setTodo } = useContext(TodosContext);

    const [todoInput, setTodoInput] = useState("");

    function handleInput(e) {
        setTodoInput(e.target.value);
    }

    function addTodo(e) {
        e.preventDefault();

        if(todoInput.trim().length === 0){
            return;
        }

        setTodo([...todos, {
            id: todos.length + 1,
            title: todoInput,
            // isCompleted: false
        }]);

        setTodoInput('');
        console.log("addtodo", todos)
    }

    return (
        <form action="#">
            <input
                type="text"
                value={todoInput}
                onChange={handleInput}
                placeholder="What do you need to do?"
            />
            <button onClick={addTodo}>Add</button>
        </form>
    );
}

export default TodoForm;