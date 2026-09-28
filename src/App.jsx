import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="w-100 p-6 rounded-xl bg-white shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-5">
          📝 Todo List
        </h1>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 h-11 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-800 outline-none focus:border-blue-400 placeholder-gray-400"
          />
          <button
            onClick={handleAdd}
            className="h-11 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet. Add one!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 px-3 py-2 rounded-md"
              >
                <span
                  onClick={() => handleToggle(todo.id)}
                  className={`cursor-pointer flex-1 ${
                    todo.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-600 hover:text-red-700 font-extrabold ml-5"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <p className="text-gray-500 text-sm text-center mt-4">
            {todos.filter((t) => t.completed).length} / {todos.length} completed
          </p>
        )}
      </div>
    </div>
  );
}

export default App;