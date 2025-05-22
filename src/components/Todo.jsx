import React, { useState, useEffect } from "react";

const TodoItem = () => {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todo-list"));
    if (saved) setList(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list]);

  const handleAddOrEdit = () => {
    if (title.trim() === "") return;

    if (editId) {
      setList(
        list.map((todo) => (todo.id === editId ? { ...todo, title } : todo))
      );
      setEditId(null);
    } else {
      setList([...list, { id: Date.now(), title, completed: false }]);
    }

    setTitle("");
    setShowInput(false);
  };

  const handleDelete = (id) => {
    setList(list.filter((todo) => todo.id !== id));
    setMenuOpenId(null);
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setEditId(todo.id);
    setShowInput(true);
    setMenuOpenId(null);
  };

  const filteredList = list.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } border border-gray-300 rounded-xl p-6`}
    >
      <div className="w-full max-w-md shadow-md p-6 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Todo</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm border px-3 py-1 rounded"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm px-3 py-1 rounded-full border ${
                filter === f ? "bg-blue-500 text-white" : "text-gray-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between relative"
            >
              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() =>
                    setList(
                      list.map((todo) =>
                        todo.id === item.id
                          ? { ...todo, completed: !todo.completed }
                          : todo
                      )
                    )
                  }
                  className="w-5 h-5 border border-gray-500 rounded-full appearance-none checked:bg-green-500 focus:outline-none"
                />
                <span
                  className={`${
                    item.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item.title}
                </span>
              </label>

              <div className="relative">
                <button
                  onClick={() =>
                    setMenuOpenId(menuOpenId === item.id ? null : item.id)
                  }
                >
                  ⋮
                </button>
                {menuOpenId === item.id && (
                  <div
                    className={`${
                      darkMode
                        ? "bg-gray-900 text-white"
                        : "bg-white text-black"
                    } absolute right-0 mt-1 shadow rounded border w-24 z-10`}
                  >
                    <button
                      onClick={() => handleEdit(item)}
                      className={`${
                        darkMode
                          ? "hover:bg-black text-white"
                          : "hover:bg-black text-black"
                      } block w-full text-left px-3 py-1`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="block w-full text-left px-3 py-1 hover:bg-red-100 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showInput && (
          <div className="mt-4 flex gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddOrEdit();
              }}
              className={`${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              } flex-grow p-2 border rounded-md`}
              placeholder="Enter a todo"
            />

            <button
              onClick={handleAddOrEdit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              {editId ? "Update" : "Save"}
            </button>
          </div>
        )}

        <div className="flex justify-center pt-5">
          <button
            onClick={() => {
              setShowInput(!showInput);
              setEditId(null);
              setTitle("");
            }}
            className="text-lg font-semibold w-full max-w-sm bg-blue-600 text-white rounded-full py-2 px-4 transition duration-300 hover:bg-blue-700"
          >
            {showInput ? "Cancel" : "Add Todo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
