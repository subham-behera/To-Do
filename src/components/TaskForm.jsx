import { useState } from "react";
import { useTaskContext } from '../contexts/TaskContext';
import { CATEGORIES, PRIORITIES } from '../constants/taskCategories';

const TaskForm = ({ onCancel }) => {
  const { addTask } = useTaskContext();
  const [newTask, setNewTask] = useState({
    text: "",
    completed: false,
    dueDate: "",
    category: "",
    priority: "",
    note: ""
  });

  const handleSubmit = () => {
    if (addTask(newTask)) {
      onCancel();
    }
  };

  return (
    <div className="p-4 bg-gray-50 border-t">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Task name"
          value={newTask.text}
          onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          autoFocus
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Due Date</label>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="w-full p-1 text-sm border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Category</label>
          <select
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            className="w-full p-1 text-sm border rounded-md"
          >
            <option value="">Select</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Priority</label>
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="w-full p-1 text-sm border rounded-md"
          >
            <option value="">Select</option>
            {PRIORITIES.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-1 text-sm bg-purple-500 text-white rounded-md"
          disabled={!newTask.text.trim()}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;