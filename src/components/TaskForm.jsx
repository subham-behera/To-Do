import { useState, useEffect } from "react";
import { useTaskContext } from '../contexts/TaskContext';
import { PRIORITIES } from '../constants/taskCategories';
import { MdClose } from "react-icons/md";

const TaskForm = () => {
  const { addTask, updateTask, editingTask, setEditingTask, categories } = useTaskContext();
  const isEditMode = typeof editingTask === 'object' && editingTask !== null;

  const [task, setTask] = useState({
    text: "",
    completed: false,
    dueDate: "",
    category: "",
    priority: "",
    note: ""
  });

  const [localSubtasks, setLocalSubtasks] = useState([]);
  const [subtaskText, setSubtaskText] = useState("");

  useEffect(() => {
    if (isEditMode) {
      setTask({ ...editingTask });
      setLocalSubtasks(editingTask.subtasks || []);
    } else {
      setTask({
        text: "",
        completed: false,
        dueDate: "",
        category: "",
        priority: "",
        note: ""
      });
      setLocalSubtasks([]);
    }
    setSubtaskText("");
  }, [editingTask, isEditMode]);

  const handleAddSubtask = () => {
    if (!subtaskText.trim()) return;
    const newSub = {
      id: Date.now().toString() + Math.random().toString(),
      text: subtaskText.trim(),
      completed: false
    };
    setLocalSubtasks([...localSubtasks, newSub]);
    setSubtaskText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.text.trim()) return;

    const taskData = {
      ...task,
      subtasks: localSubtasks
    };

    if (isEditMode) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setEditingTask(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title & Close */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
        <h2 className="text-base font-bold text-slate-800">
          {isEditMode ? "Edit Task" : "New Task"}
        </h2>
        <button
          type="button"
          onClick={() => setEditingTask(null)}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
        >
          <MdClose className="text-lg" />
        </button>
      </div>

      {/* Task Name */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          What is to be done?
        </label>
        <input
          type="text"
          placeholder="e.g., Finalize presentation slides"
          value={task.text}
          onChange={(e) => setTask({ ...task, text: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-600/5 transition-all duration-200"
          autoFocus
          required
        />
      </div>

      {/* Notes / Description */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          Notes / Description
        </label>
        <textarea
          placeholder="Add details, links, or notes..."
          value={task.note || ""}
          onChange={(e) => setTask({ ...task, note: e.target.value })}
          rows={2}
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-600/5 transition-all duration-200 resize-none"
        />
      </div>

      {/* Sub-tasks Creator */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          Sub-tasks Checklist
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a sub-task..."
            value={subtaskText}
            onChange={(e) => setSubtaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSubtask();
              }
            }}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-600/5 transition-all"
          />
          <button
            type="button"
            onClick={handleAddSubtask}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs cursor-pointer transition-colors"
          >
            Add
          </button>
        </div>

        {localSubtasks.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-2 max-h-28 overflow-y-auto bg-slate-50/50 p-2 border border-slate-100 rounded-xl scrollbar-hide">
            {localSubtasks.map((sub) => (
              <div key={sub.id} className="flex justify-between items-center bg-white border border-slate-100 rounded-lg p-2 shadow-[0_1px_2px_rgba(0,0,0,0.005)]">
                <span className="text-xs text-slate-600 truncate mr-2 font-medium">{sub.text}</span>
                <button
                  type="button"
                  onClick={() => setLocalSubtasks(localSubtasks.filter(s => s.id !== sub.id))}
                  className="text-slate-400 hover:text-rose-500 font-bold text-xs p-0.5 cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid Selectors */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Due Date */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            value={task.dueDate || ""}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-600/5 transition-all"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={task.category || ""}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 appearance-none focus:outline-none focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-600/5 transition-all cursor-pointer"
            >
              <option value="">Select</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <span className="absolute right-3 top-3 w-1.5 h-1.5 border-r-2 border-b-2 border-slate-400 rotate-45 pointer-events-none" />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Priority
          </label>
          <div className="relative">
            <select
              value={task.priority || ""}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 appearance-none focus:outline-none focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-600/5 transition-all cursor-pointer"
            >
              <option value="">Select</option>
              {PRIORITIES.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <span className="absolute right-3 top-3 w-1.5 h-1.5 border-r-2 border-b-2 border-slate-400 rotate-45 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setEditingTask(null)}
          className="px-4.5 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-200/80 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!task.text.trim()}
          className="px-4.5 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 transition-all cursor-pointer shadow-md shadow-indigo-600/10"
        >
          {isEditMode ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;