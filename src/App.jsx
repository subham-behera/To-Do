import { TaskProvider, useTaskContext } from './contexts/TaskContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CategoryManager from './components/CategoryManager';
import AnalyticsView from './components/AnalyticsView';

import { MdList, MdOutlineCategory, MdBarChart } from "react-icons/md";
import { BsArchive as BsArchiveIcon } from "react-icons/bs";
import { GoPlus } from "react-icons/go";

const AppContent = () => {
  const { 
    archiveCompleted, 
    tasks, 
    editingTask, 
    setEditingTask, 
    activeTab, 
    setActiveTab 
  } = useTaskContext();

  return (
    <div className="w-full max-w-5xl h-screen md:h-[85vh] md:max-h-[800px] bg-white md:rounded-3xl md:shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col md:flex-row overflow-hidden border border-slate-100">
      
      {/* DESKTOP SIDEBAR PANEL (Left Side) */}
      <div className="hidden md:flex md:w-80 border-r border-slate-100 flex-col bg-slate-50/50 p-6 overflow-y-auto shrink-0 select-none scrollbar-hide gap-6">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
            TaskMaster<span className="text-indigo-600">.</span>
          </h1>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 block">
            Workspace Dashboard
          </span>
        </div>

        {/* Sidebar Sections */}
        <div className="flex flex-col gap-6">
          {/* Category Section */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.005)]">
            <CategoryManager />
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.005)]">
            <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <MdBarChart className="text-lg text-indigo-500" />
              Workspace Metrics
            </h4>
            <AnalyticsView />
          </div>
        </div>
      </div>

      {/* MAIN VIEWPORT PANEL (Right Side on Desktop / Screen on Mobile) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
        
        {/* Mobile top header (only visible on mobile) */}
        <div className="md:hidden block flex-shrink-0">
          <Header />
        </div>

        {/* Dynamic Scroll View */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
          
          {/* Desktop top header (only visible on desktop) */}
          <div className="hidden md:block flex-shrink-0">
            <Header />
          </div>

          {/* Desktop Task Area */}
          <div className="hidden md:block">
            <FilterBar />
            <TaskList />
          </div>

          {/* Mobile views switching based on active tab */}
          <div className="md:hidden block">
            {activeTab === 'tasks' && (
              <>
                <FilterBar />
                <TaskList />
              </>
            )}
            
            {activeTab === 'categories' && (
              <div className="px-6 py-2">
                <CategoryManager />
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="px-6 py-2">
                <AnalyticsView />
              </div>
            )}
          </div>
        </div>

        {/* Floating Action / Archive Action Bar */}
        <div className={`absolute left-0 right-0 bg-white/85 backdrop-blur-md border-t border-slate-100/80 p-4 flex justify-between items-center z-10 transition-all ${
          activeTab === 'tasks' 
            ? 'bottom-16 md:bottom-0 flex' 
            : 'hidden md:flex md:bottom-0'
        }`}>
          <button
            onClick={archiveCompleted}
            className="flex items-center text-xs font-bold text-slate-500 hover:text-rose-500 disabled:opacity-40 disabled:hover:text-slate-500 transition-colors py-2 px-3 rounded-xl hover:bg-slate-50 cursor-pointer"
            disabled={!tasks.some(task => task.completed)}
          >
            <BsArchiveIcon className="mr-2 text-sm" />
            Archive Completed
          </button>
          
          <button
            onClick={() => setEditingTask('new')}
            className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Add Task"
          >
            <GoPlus className="text-2xl font-bold" />
          </button>
        </div>

        {/* Mobile Tab Navigation Bar */}
        <div className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around z-20 px-6">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              activeTab === 'tasks' ? 'text-indigo-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MdList className="text-xl" />
            <span className="text-[9px] font-bold">Tasks</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              activeTab === 'categories' ? 'text-indigo-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MdOutlineCategory className="text-xl" />
            <span className="text-[9px] font-bold">Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              activeTab === 'analytics' ? 'text-indigo-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MdBarChart className="text-xl" />
            <span className="text-[9px] font-bold">Analytics</span>
          </button>
        </div>

      </div>

      {/* Create / Edit Bottom Sheet modal */}
      {editingTask && (
        <>
          <div
            onClick={() => setEditingTask(null)}
            className="fixed inset-0 bg-slate-950/30 backdrop-blur-[1px] z-40 animate-fade-in"
          />
          <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center p-0 md:p-4 pointer-events-none">
            <div className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden animate-slide-up md:animate-fade-in flex flex-col pointer-events-auto max-h-[85vh] md:max-h-[90vh]">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-3 flex-shrink-0 md:hidden" />
              <div className="overflow-y-auto px-6 pb-6 pt-1 md:pt-6">
                <TaskForm />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="bg-slate-50 md:bg-slate-100 min-h-screen flex justify-center items-center p-0 md:p-6">
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </div>
  );
};

export default App;