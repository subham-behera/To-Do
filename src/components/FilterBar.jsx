import { MdSearch } from "react-icons/md";
import { BsSortDown } from "react-icons/bs";
import { useTaskContext } from '../contexts/TaskContext';
import { PRIORITIES } from '../constants/taskCategories';

const FilterBar = () => {
  const { 
    filter, setFilter,
    categoryFilter, setCategoryFilter,
    priorityFilter, setPriorityFilter,
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    categories
  } = useTaskContext();

  return (
    <div className="px-6 pb-4 bg-white flex flex-col gap-3">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-100/70 border border-transparent rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-600/5 transition-all duration-200"
        />
        <MdSearch className="absolute left-3.5 top-3.5 text-slate-400 text-lg" />
      </div>
      
      {/* Scrollable Filters Row */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-6 px-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === "all" 
              ? "bg-slate-900 text-white" 
              : "bg-slate-100 text-slate-600 hover:bg-slate-200/75"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === "active" 
              ? "bg-slate-900 text-white" 
              : "bg-slate-100 text-slate-600 hover:bg-slate-200/75"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === "completed" 
              ? "bg-slate-900 text-white" 
              : "bg-slate-100 text-slate-600 hover:bg-slate-200/75"
          }`}
        >
          Completed
        </button>

        <div className="h-5 w-[1px] bg-slate-200 my-auto shrink-0 mx-1" />

        {/* Category Picker */}
        <div className="relative shrink-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`pl-3 pr-7 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-transparent appearance-none focus:outline-none transition-all hover:bg-slate-200/75 cursor-pointer ${
              categoryFilter ? "bg-indigo-50 text-indigo-600 border-indigo-200/50" : ""
            }`}
          >
            <option value="">Category: All</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <span className="absolute right-2.5 top-2.5 w-1.5 h-1.5 border-r-2 border-b-2 border-slate-400 rotate-45 pointer-events-none" />
        </div>

        {/* Priority Picker */}
        <div className="relative shrink-0">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={`pl-3 pr-7 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-transparent appearance-none focus:outline-none transition-all hover:bg-slate-200/75 cursor-pointer ${
              priorityFilter ? "bg-indigo-50 text-indigo-600 border-indigo-200/50" : ""
            }`}
          >
            <option value="">Priority: All</option>
            {PRIORITIES.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <span className="absolute right-2.5 top-2.5 w-1.5 h-1.5 border-r-2 border-b-2 border-slate-400 rotate-45 pointer-events-none" />
        </div>

        {/* Sort Picker */}
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-7 pr-7 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-transparent appearance-none focus:outline-none transition-all hover:bg-slate-200/75 cursor-pointer"
          >
            <option value="createdAt">Sort: Created</option>
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
          </select>
          <BsSortDown className="absolute left-2.5 top-2.5 text-slate-400 text-[13px]" />
          <span className="absolute right-2.5 top-2.5 w-1.5 h-1.5 border-r-2 border-b-2 border-slate-400 rotate-45 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;