import { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", [
    { id: "1", text: "Journal", completed: false, createdAt: new Date().toISOString() }
  ]);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [stats, setStats] = useState({ total: 0, completed: 0, remaining: 0 });

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
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      return true;
    }
    return false;
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const archiveCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    
    // Filter by category
    if (categoryFilter && task.category !== categoryFilter) return false;
    
    // Filter by priority
    if (priorityFilter && task.priority !== priorityFilter) return false;
    
    // Search by text
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
    filter, setFilter,
    categoryFilter, setCategoryFilter,
    priorityFilter, setPriorityFilter,
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    stats,
    addTask,
    updateTask,
    deleteTask,
    archiveCompleted
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};