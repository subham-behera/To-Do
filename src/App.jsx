import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { BsArchive } from "react-icons/bs";
import { TaskProvider, useTaskContext } from './contexts/TaskContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

// App inner content component
const AppContent = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const { archiveCompleted, tasks } = useTaskContext();

  return (
    <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
      <Header />
      <FilterBar />
      <TaskList />
      
      {showNewTaskForm ? (
        <TaskForm onCancel={() => setShowNewTaskForm(false)} />
      ) : (
        <div className="p-4 flex justify-between items-center border-t">
          <button
            onClick={archiveCompleted}
            className="flex items-center text-sm text-gray-500 hover:text-purple-500"
            disabled={!tasks.some(task => task.completed)}
          >
            <BsArchive className="mr-1" />
            Archive Completed
          </button>
          
          <button
            onClick={() => setShowNewTaskForm(true)}
            className="flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
          >
            <GoPlus className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

// Main App component with Provider
const App = () => {
  return (
    <div className="bg-gradient-to-r from-violet-400 to-purple-300 min-h-screen flex justify-center items-center p-4">
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </div>
  );
};

export default App;