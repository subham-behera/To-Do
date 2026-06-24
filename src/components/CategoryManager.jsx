import { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { CATEGORY_COLORS, DEFAULT_CATEGORIES } from '../constants/taskCategories';
import { getCategoryColor } from '../utils/taskUtils';
import { MdDelete, MdAdd } from 'react-icons/md';

const CategoryManager = () => {
  const { categories, addCategory, deleteCategory, tasks } = useTaskContext();
  const [newCatName, setNewCatName] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(CATEGORY_COLORS[0].id);
  const [error, setError] = useState("");

  const getTaskCount = (catId) => {
    return tasks.filter(t => t.category === catId).length;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setError("");
    if (!newCatName.trim()) {
      setError("Category name is required.");
      return;
    }
    if (newCatName.length > 20) {
      setError("Name must be under 20 characters.");
      return;
    }
    
    const success = addCategory(newCatName, selectedColorId);
    if (success) {
      setNewCatName("");
      setError("");
    } else {
      setError("Category already exists.");
    }
  };

  const isSystemDefault = (catId) => {
    return DEFAULT_CATEGORIES.some(d => d.id === catId);
  };

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* List Categories */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Your Categories
        </h3>
        
        <div className="flex flex-col gap-2">
          {categories.map((cat) => {
            const isDefault = isSystemDefault(cat.id);
            const count = getTaskCount(cat.id);
            
            return (
              <div 
                key={cat.id} 
                className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              >
                <div className="flex items-center gap-2.5">
                  {/* Category Badge */}
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg ${getCategoryColor(cat.id, categories)}`}>
                    {cat.name}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {count} {count === 1 ? 'task' : 'tasks'}
                  </span>
                </div>
                
                {!isDefault && (
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                    title="Delete Category"
                  >
                    <MdDelete className="text-base" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Category Form */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4">
        <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
          Create Custom Category
        </h3>
        
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Category Name (e.g. Shopping)"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-600/10 focus:ring-4 focus:ring-indigo-600/5 transition-all"
              required
            />
            {error && <span className="text-[10px] font-semibold text-rose-500 mt-1 block">{error}</span>}
          </div>
          
          {/* Color Picker Grid */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Color
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColorId(color.id)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-all flex items-center justify-center relative hover:scale-110 active:scale-95 ${
                    selectedColorId === color.id 
                      ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105' 
                      : 'opacity-85 hover:opacity-100'
                  }`}
                  title={color.name}
                >
                  {selectedColorId === color.id && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/5 cursor-pointer transition-all"
          >
            <MdAdd className="text-base" /> Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryManager;
