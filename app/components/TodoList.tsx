"use client";
import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (!newTodo) return;

    const newTodoItem = {
      id: Date.now(), // Unique id based on timestamp
      title: newTodo,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    setNewTodo(""); // Clear input after adding
  };

  // Handle updating a todo
  const handleUpdateTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return <section className="my-8"> <h1 className="text-3xl font-semibold text-center mb-6 text-white">Todo List</h1>

    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg w-full">

      {/* Add Todo */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-2 border border-gray-300 rounded-md mr-4 text-black"
        />
        <button
          onClick={handleAddTodo}
          disabled={loading}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400`}
        >
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </div>

      {/* Todo List */}
      <ul className="space-y-3 text-black">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-3 bg-gray-100 rounded-md ${todo.completed ? "line-through text-gray-400" : ""}`}
          >
            <span
              onClick={() => handleUpdateTodo(todo.id)}
              className="cursor-pointer flex-1"
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={loading}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  
    </section>
   
};

export default TodoList;
