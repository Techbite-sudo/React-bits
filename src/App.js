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
  },[]);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        content: newTodo,
        done: false,
      },
    ]);
    setNewTodo("");
  }, [newTodo, todos]);

  useEffect(() => {
    console.log("todo", todos);
  }, [todos]);

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
        {
          todos.map((todo) => (
            <li>{todo.content}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
