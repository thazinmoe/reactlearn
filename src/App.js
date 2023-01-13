import React, { useState, useRef, useEffect, useContext } from "react";
import Task from "./Task";
import "./App.css";
import TodoForm from "./TodoForm";
import { TodosContext } from "./context/TodosContext";
import useLocalStorage from "./useLocalStorage";
// import PlanetItem from "./PlanetItem";

function App() {
  const [todos, setTodo] = useLocalStorage("todos", []);
  const [todosname, setTodoName] = useLocalStorage("todosname", []);
  const nameInputEl = useRef(null);
  const [name, setName] = useLocalStorage("name", "");
  const [todoInput, setTodoInput] = useState("");

  const [hasError, setErrors] = useState(false);
  const [planets, setPlanets] = useState([]);
  console.log(planets);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=5", {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
          Accept: "*/*",
          mode: "cors",
          cache: "no-cache",
          "Access-Control-Allow-Origin": "*",
        });
        res
          .json()
          .then((data) => setPlanets(data))
          .catch((err) => setErrors(err));
      } catch (err) {
        console.log("error", err);
      }
    }
    fetchData();
  }, []);

  function deletePlanets(id) {
    setPlanets(planets.filter((planet) => planet.id !== id));
  }

  // function completePlanets(id){
  //   const updatePlanets = planets.map(planet => {
  //     if(planet.id === id){
  //       planet.isComplete = !planet.isComplete;
  //     }
  //     return planet;
  //   });
  //   setPlanets(updatePlanets);
  // }

  function markAsEditing(id){
    const updatePlanets = planets.map((planet) => {
      if(planet.id === id){
        planet.isEditing = true;
      }
      return planet;
    });
    setPlanets(updatePlanets);
    console.log("mark")
  }

  function updatePlanet(event,id){
    const updatePlanets = planets.map((planet)=> {
      if(planet.id === id){
        if(event.target.value.trim().length === 0){
          planet.isEditing = false;
          return planet;
        }
        planet.title = event.target.value;
        planet.isEditing = false;
      }
      return planet;
    });
    setPlanets(updatePlanets);
  }

  function cancelPlanet(event, id){
    const updatePlanets = planets.map((planet) => {
      if(planet.id === id){
        planet.isEditing = false;
      }
      return planet;
    });
    setPlanets(updatePlanets);
    console.log("cancel");
  }

  // updatePlanet = (data) => {
  //   const todos = [...planets];

  //   const index = todos.findIndex((todo) => todo.id === data.id);
  //   todos[index].title = data.title;
  //   this.setPlanets(todos);
  // };

  function addNameTodo(e) {
    e.preventDefault();
    if (name.trim().length === 0) {
      return;
    }
    const todoList = {
      id: todosname.length + 1,
      nametodo: name,
      isComplete: false,
    };
    setTodoName([...todosname, todoList]);

    // setIdForTodo(prevIdForTodo => prevIdForTodo + 1);

    setName("");
  }

  useEffect(() => {
    nameInputEl.current.focus();

    return function cleanup() {
      console.log("cleaning up");
    };
  }, []);

  function handleNameInput(e) {
    setName(e.target.value);
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodo,
        todoInput,
        setTodoInput,
      }}
    >
      <div>
        <h2>What is your name?</h2>
        <input
          type="text"
          ref={nameInputEl}
          value={name}
          placeholder="What is your name?"
          onChange={handleNameInput}
        />
        <button onClick={addNameTodo}>AddName</button>
        <p>
          Hello, {name}
          {typeof todosname}
        </p>
        <ul>
          {todosname?.map((todoname, i) => {
            return (
              <li key={i}>
                <p>{todoname.nametodo}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <TodoForm />
      <ul>
        {/* <span>{JSON.stringify(typeof(todos))}</span> */}
        {planets?.map((v, i) => {
          return (
            <li key={i}>
              
              {!v.isEditing ? (
                        <span
                        onDoubleClick={()=> markAsEditing(v.id)}
                      >
                        <span>{v.title}</span>
                      </span>
                      ) : (
                        <input 
                          type="text"
                          onBlur={(event) => updatePlanet(event,v.id)}
                          onKeyDown={(event) => {
                            if(event.key === 'Enter'){
                              updatePlanet(event,v.id);
                            }else if(event.key === 'Escape'){
                              cancelPlanet(event, v.id)
                            }
                          }}
                          defaultValue={v.title}
                          autoFocus
                        />
                      )}
              {/* {!v.isEditing? (
                 <PlanetItem 
                 title={v.title}
                 key={v.id}
                 // deleteTodo={this.deleteTodo}
                 id={v.id}
                 updatePlanet={updatePlanet}
               />
              ) : (
                <input 
                          type="text"
                          onBlur={(event) => updatePlanet(event,v.id)}
                          onKeyDown={(event) => {
                            if(event.key === 'Enter'){
                              updatePlanet(event,v.id);
                            }else if(event.key === 'Escape'){
                              cancelPlanet(event, v.id)
                            }
                          }}
                          defaultValue={v.title}
                          autoFocus
                        />
              )} */}
               {/* <PlanetItem 
                title={v.title}
                key={v.id}
                // deleteTodo={this.deleteTodo}
                id={v.id}
                updatePlanet={v.updatePlanet}
              /> */}
              <button onClick={() => deletePlanets(v.id)}>X</button> 
            </li>
          );
        })}
        {/* <span>{JSON.stringify(planets)}</span> */}
        <hr />
        {/* <span>Has error: {JSON.stringify(hasError)}</span> */}
      </ul>
      {todos.length > 0 ? <Task /> : ""}
      {/* <form action='#'>
        <input 
          type="text"
          value={todoInput}
          onChange={handleInput}
          placeholder="What do you need to do?"
        />
        <button type='submit' onClick={addTodo}>Add</button>
      </form> */}
      {/* <ul>
        {todos.map((todo,index)=>{
          return(          
           <TodosContext.Provider
            key={index}
            value={{
              todos,
              setTodo,
              todoInput,
              setTodoInput
            }}
            >
             <Task
              title={todo.title}
              id={todo.id}
              isComplete={todo.isComplete}
              isEditing={todo.isEditing}
              completeTodo={completeTodo}
              markAsEditing={markAsEditing}
              updateTodo={updateTodo}
              cancelTodo={cancelTodo}
              deleteTodo={deleteTodo}
            />
           </TodosContext.Provider>
           
          
          );
        })}
      </ul> */}
    </TodosContext.Provider>
  );
}

export default App;
