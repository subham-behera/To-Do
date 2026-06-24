import { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DEFAULT_CATEGORIES } from '../constants/taskCategories';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", [
    { id: "1", text: "Journal my thoughts", completed: false, category: "personal", priority: "low", subtasks: [], note: "Spend 10 minutes reflecting on today.", createdAt: new Date().toISOString() }
  ]);
  const [categories, setCategories] = useLocalStorage("categories", DEFAULT_CATEGORIES);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [stats, setStats] = useState({ total: 0, completed: 0, remaining: 0 });
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState("tasks"); // 'tasks', 'categories', 'analytics'

  useEffect(() => {
    // Calculate statistics
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    setStats({
      total,
      completed,
      remaining: total - completed
    });
  }, [tasks]);

  const addTask = (newTask) => {
    if (newTask.text.trim()) {
      const task = {
        ...newTask,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        subtasks: newTask.subtasks || [],
        note: newTask.note || ""
      };
      setTasks([...tasks, task]);
      return true;
    }
    return false;
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...updatedTask, subtasks: updatedTask.subtasks || [] } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const archiveCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Custom Categories Functions
  const addCategory = (name, colorId) => {
    if (!name.trim()) return false;
    const id = name.trim().toLowerCase().replace(/\s+/g, '-');
    if (categories.some(cat => cat.id === id)) return false;
    setCategories([...categories, { id, name: name.trim(), colorId }]);
    return true;
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    // Reset tasks categorized with this category to empty
    setTasks(tasks.map(task => task.category === id ? { ...task, category: "" } : task));
    if (categoryFilter === id) {
      setCategoryFilter("");
    }
  };

  // Sub-task Functions
  const addSubtask = (taskId, text) => {
    if (!text.trim()) return;
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const subtasks = [...(task.subtasks || [])];
        subtasks.push({
          id: Date.now().toString(),
          text: text.trim(),
          completed: false
        });
        return { ...task, subtasks };
      }
      return task;
    }));
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const subtasks = (task.subtasks || []).map(sub => 
          sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
        );
        return { ...task, subtasks };
      }
      return task;
    }));
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const subtasks = (task.subtasks || []).filter(sub => sub.id !== subtaskId);
        return { ...task, subtasks };
      }
      return task;
    }));
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    if (categoryFilter && task.category !== categoryFilter) return false;
    if (priorityFilter && task.priority !== priorityFilter) return false;
    if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      const aValue = a.priority ? priorityOrder[a.priority] : 4;
      const bValue = b.priority ? priorityOrder[b.priority] : 4;
      return aValue - bValue;
    }
    return 0;
  });

  const value = {
    tasks,
    sortedTasks,
    categories,
    filter, setFilter,
    categoryFilter, setCategoryFilter,
    priorityFilter, setPriorityFilter,
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    stats,
    addTask,
    updateTask,
    deleteTask,
    archiveCompleted,
    addCategory,
    deleteCategory,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    editingTask, setEditingTask,
    activeTab, setActiveTab
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};