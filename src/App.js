// function App() {
//   return (
//     <div className="App">
//       <h1>Hello world!</h1>
//     </div>
//   );
// }

// const App = () => (
//   <div>
//     <h1>Hello world!</h1>
//   </div>
// );
import React, { useCallback, useState, useEffect } from "react";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    console.log(event.target.value);
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();
      if (!newTodo.trim()) return;
      setTodos([
        {
          id: todos.length ? todos[0].id + 1 : 1,
          content: newTodo,
          done: false,
        },
        ...todos,
      ]);
      setNewTodo("");
    },
    [newTodo, todos]
  );

  useEffect(() => {
    console.log("todo", todos);
  }, [todos]);

  const addTodo = useCallback(
    (todo, index) => (event) => {
      console.log(event.target.checked);
      const newTodos = [...todos];
      newTodo.splice(index, 1, {
        ...todo,
        done: !todo.done,
      });
      setTodos(newTodos);
    },
    [todos, newTodo]
  );

  const removeTodo = useCallback(
    (todo) => (event) => {
      setTodos(todos.filter((otherTodo) => otherTodo !== todo));
    },
    [todos]
  );

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          type="text"
          onChange={onNewTodoChange}
        />
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? "done" : ""}> {todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
