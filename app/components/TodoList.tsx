"use client";
// import React, { useState, useEffect } from "react";

// interface Todo {
//   _id: string;
//   title: string;
//   completed: boolean;
//   offline?: boolean; // flag to mark if this todo is pending sync
// }

// const LOCAL_STORAGE_KEY = "todos";

// const TodoList = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = useState<string>("");
//   const [loadingTodoId, setLoadingTodoId] = useState<string | null>(null);
//   const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
//   const [editTodoId, setEditTodoId] = useState<string | null>(null);
//   const [editText, setEditText] = useState<string>("");

//   // Fetch todos from API, fallback to localStorage if offline
//   const fetchTodos = async () => {
//     try {
//       const res = await fetch("/api/todos");
//       if (!res.ok) throw new Error("Failed to fetch todos");
//       const data = await res.json();
//       setTodos(data);
//       // Save the todos in local storage
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
//     } catch (error) {
//       console.error("Fetch error, loading from local storage:", error);
//       // If offline or fetch fails, load from localStorage
//       const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
//       if (storedTodos) {
//         setTodos(JSON.parse(storedTodos));
//       }
//     }
//   };

//   useEffect(() => {
//     fetchTodos();

//     // Listen for online event and re-fetch
//     const handleOnline = () => {
//       fetchTodos();
//     };
//     window.addEventListener("online", handleOnline);
//     return () => window.removeEventListener("online", handleOnline);
//   }, []);

//   // Add Todo with optimistic update and offline fallback
//   const handleAddTodo = async () => {
//     if (!newTodo.trim()) return;
//     setLoadingAdd(true);

//     // Create a temporary todo object
//     const isOffline = !navigator.onLine;
//     const tempTodo: Todo = {
//       _id: isOffline ? `temp-${Date.now()}` : "",
//       title: newTodo,
//       completed: false,
//       offline: isOffline,
//     };

//     // Optimistically update UI and local storage
//     const updatedTodos = [...todos, tempTodo];
//     setTodos(updatedTodos);
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
//     setNewTodo("");
//     setLoadingAdd(false);

//     try {
//       // Always attempt the fetch (the service worker will queue it if offline)
//       const res = await fetch("/api/todos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: newTodo }),
//       });
//       if (!res.ok) throw new Error("Failed to add todo");
//       const newTodoItem = await res.json();

//       // Replace the temporary todo with the one from the server
//       const finalTodos = updatedTodos.map((todo) =>
//         todo._id.startsWith("temp-") && todo.title === newTodo ? newTodoItem : todo
//       );
//       setTodos(finalTodos);
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(finalTodos));
//     } catch (error) {
//       console.error("Error adding todo (likely offline, request queued):", error);
//       // The service worker (background sync) should queue the request and retry later.
//     } finally {
//       setLoadingAdd(false);
//     }
//   };

//   // Similar optimistic patterns can be applied for update and delete operations:
//   const toggleCompleteTodo = async (id: string, completed: boolean) => {
//     setLoadingTodoId(id);
//     // Optimistically update UI
//     setTodos((prev) =>
//       prev.map((todo) => (todo._id === id ? { ...todo, completed: !completed } : todo))
//     );
//     try {
//       const res = await fetch("/api/todos", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, completed: !completed }),
//       });
//       if (!res.ok) throw new Error("Failed to update todo");
//       const updatedTodo = await res.json();
//       setTodos((prev) =>
//         prev.map((todo) => (todo._id === id ? updatedTodo : todo))
//       );
//     } catch (error) {
//       console.error("Error updating todo:", error);
//     } finally {
//       setLoadingTodoId(null);
//     }
//   };

//   const handleDeleteTodo = async (id: string) => {
//     setLoadingTodoId(id);
//     // Optimistically update UI by removing the todo
//     setTodos((prev) => prev.filter((todo) => todo._id !== id));
//     try {
//       const res = await fetch("/api/todos", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       if (!res.ok) throw new Error("Failed to delete todo");
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     } finally {
//       setLoadingTodoId(null);
//     }
//   };

//   // Edit Todo (optimistic update)
//   const handleEditTodo = async (id: string) => {
//     if (!editText.trim()) return;
//     setLoadingTodoId(id);
//     // Optimistically update UI
//     setTodos((prev) =>
//       prev.map((todo) => (todo._id === id ? { ...todo, title: editText } : todo))
//     );
//     try {
//       const res = await fetch("/api/todos", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, title: editText }),
//       });
//       if (!res.ok) throw new Error("Failed to update todo");
//       const updatedTodo = await res.json();
//       setTodos((prev) =>
//         prev.map((todo) => (todo._id === id ? updatedTodo : todo))
//       );
//       setEditTodoId(null);
//       setEditText("");
//     } catch (error) {
//       console.error("Error editing todo:", error);
//     } finally {
//       setLoadingTodoId(null);
//     }
//   };

//   return (
//     <section className="my-8">
//       <h1 className="text-3xl font-semibold text-center mb-6 text-white">Todo List</h1>
//       <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg w-full">
//         {/* Add Todo */}
//         <div className="mb-4 flex items-center">
//           <input
//             type="text"
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             placeholder="Add a new todo"
//             className="flex-1 p-2 border border-gray-300 rounded-md mr-4 text-black"
//           />
//           <button
//             onClick={handleAddTodo}
//             disabled={loadingAdd}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {loadingAdd ? "Adding..." : "Add Todo"}
//           </button>
//         </div>
//         {/* Todo List */}
//         <ul className="space-y-3 text-black">
//           {todos.map((todo) => (
//             <li
//               key={todo._id}
//               className={`flex items-center justify-between p-3 bg-gray-100 rounded-md ${
//                 todo.completed ? "line-through text-gray-400" : ""
//               }`}
//             >
//               {editTodoId === todo._id ? (
//                 <input
//                   type="text"
//                   value={editText}
//                   onChange={(e) => setEditText(e.target.value)}
//                   className="flex-1 p-2 border border-gray-300 rounded-md text-black"
//                 />
//               ) : (
//                 <span
//                   onClick={() => toggleCompleteTodo(todo._id, todo.completed)}
//                   className="cursor-pointer flex-1"
//                 >
//                   {todo.title} {todo.offline && " (pending sync)"}
//                 </span>
//               )}
//               {editTodoId === todo._id ? (
//                 <button
//                   onClick={() => handleEditTodo(todo._id)}
//                   disabled={loadingTodoId === todo._id}
//                   className="ml-4 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
//                 >
//                   {loadingTodoId === todo._id ? "Saving..." : "Save"}
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setEditTodoId(todo._id);
//                     setEditText(todo.title);
//                   }}
//                   disabled={loadingTodoId === todo._id}
//                   className="ml-4 px-3 py-1 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 disabled:bg-gray-400"
//                 >
//                   Edit
//                 </button>
//               )}
//               <button
//                 onClick={() => handleDeleteTodo(todo._id)}
//                 disabled={loadingTodoId === todo._id}
//                 className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
//               >
//                 {loadingTodoId === todo._id ? "Deleting..." : "Delete"}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// };
const TodoList=()=>{
  return <></>
}

export default TodoList;
