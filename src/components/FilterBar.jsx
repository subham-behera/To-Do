import { MdSearch, MdOutlineCategory, MdOutlinePriorityHigh } from "react-icons/md";
import { BsSortDown } from "react-icons/bs";
import { useTaskContext } from '../contexts/TaskContext';
import { CATEGORIES, PRIORITIES } from '../constants/taskCategories';

const FilterBar = () => {
  const { 
    filter, setFilter,
    categoryFilter, setCategoryFilter,
    priorityFilter, setPriorityFilter,
    searchQuery, setSearchQuery,
    sortBy, setSortBy
  } = useTaskContext();

  return (
    <div className="px-6 pb-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <MdSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
      </div>
      
      <div className="flex mt-2 gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-xs font-medium ${filter === "all" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded-full text-xs font-medium ${filter === "active" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-full text-xs font-medium ${filter === "completed" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Completed
        </button>
        
        <div className="ml-auto flex gap-1">
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setCategoryFilter(categoryFilter ? "" : "work")}>
            <MdOutlineCategory className={`text-lg ${categoryFilter ? "text-purple-500" : "text-gray-400"}`} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setPriorityFilter(priorityFilter ? "" : "high")}>
            <MdOutlinePriorityHigh className={`text-lg ${priorityFilter ? "text-purple-500" : "text-gray-400"}`} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setSortBy(sortBy === "createdAt" ? "dueDate" : "createdAt")}>
            <BsSortDown className={`text-lg ${sortBy !== "createdAt" ? "text-purple-500" : "text-gray-400"}`} />
          </button>
        </div>
      </div>
      
      {(categoryFilter || priorityFilter) && (
        <div className="flex mt-2 gap-2">
          {categoryFilter && (
            <div className="flex items-center text-xs bg-purple-100 rounded-full px-2 py-1">
              <span className="mr-1">Category: {CATEGORIES.find(c => c.id === categoryFilter)?.name}</span>
              <button onClick={() => setCategoryFilter("")} className="text-purple-500">×</button>
            </div>
          )}
          {priorityFilter && (
            <div className="flex items-center text-xs bg-purple-100 rounded-full px-2 py-1">
              <span className="mr-1">Priority: {PRIORITIES.find(p => p.id === priorityFilter)?.name}</span>
              <button onClick={() => setPriorityFilter("")} className="text-purple-500">×</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;