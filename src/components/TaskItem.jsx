import { useState } from "react";
import { MdModeEdit, MdDelete, MdOutlineCalendarToday, MdDescription, MdFormatListNumbered, MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTaskContext } from '../contexts/TaskContext';
import { getCategoryColor, getPriorityColor } from '../utils/taskUtils';
import { PRIORITIES } from '../constants/taskCategories';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask, setEditingTask, categories, toggleSubtask, deleteSubtask } = useTaskContext();
  const [showOptions, setShowOptions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const subtasks = task.subtasks || [];
  const completedSubs = subtasks.filter(s => s.completed).length;
  const totalSubs = subtasks.length;
  const subPct = totalSubs > 0 ? Math.round((completedSubs / totalSubs) * 100) : 0;

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`relative flex flex-col w-full mb-3 p-4 rounded-2xl border transition-all duration-200 ${
      task.completed 
        ? 'bg-slate-50/60 border-slate-100/40 text-slate-400' 
        : 'bg-white border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.015)] text-slate-700 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]'
    }`}>
      {/* Top Header Row of the Card */}
      <div 
        onClick={handleCardClick}
        className="flex items-center justify-between cursor-pointer min-w-0"
      >
        <div className="flex items-center flex-1 min-w-0 pr-3">
          {/* Custom Circular Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent card expansion
              updateTask(task.id, { ...task, completed: !task.completed });
            }}
            className={`custom-checkbox mr-3.5 flex-shrink-0 ${task.completed ? 'checked' : ''}`}
            aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
          />
          
          {/* Text & Indicators */}
          <div className="flex flex-col min-w-0">
            <span className={`text-sm font-semibold transition-all duration-200 truncate ${
              task.completed ? 'line-through text-slate-400 font-medium' : 'text-slate-800'
            }`}>
              {task.text}
            </span>
            
            {/* Collapsed indicators row */}
            <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
              {task.dueDate && (
                <span className="flex items-center text-[10px] font-bold text-slate-400 bg-slate-100/50 border border-slate-200/10 rounded-md px-1.5 py-0.5">
                  <MdOutlineCalendarToday className="mr-1 text-[11px]" />
                  {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              )}
              
              {task.category && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${getCategoryColor(task.category, categories)}`}>
                  {categories.find(cat => cat.id === task.category)?.name}
                </span>
              )}
              
              {task.priority && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${getPriorityColor(task.priority)}`}>
                  {PRIORITIES.find(p => p.id === task.priority)?.name}
                </span>
              )}

              {/* Note indicator */}
              {!isExpanded && task.note && (
                <MdDescription className="text-slate-400 text-xs mr-0.5" title="Has notes" />
              )}

              {/* Subtask checklist indicator */}
              {!isExpanded && totalSubs > 0 && (
                <span className="flex items-center text-[9px] font-bold text-slate-400 bg-slate-100 rounded px-1 py-0.5">
                  <MdFormatListNumbered className="mr-1 text-[11px]" />
                  {completedSubs}/{totalSubs}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Options & Toggle Arrow */}
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {/* Action drop-down */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer hover:bg-slate-100 ${
                showOptions ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'
              }`}
              aria-label="Task options"
            >
              <BsThreeDotsVertical className="text-sm" />
            </button>
            
            {showOptions && (
              <>
                <div 
                  onClick={() => setShowOptions(false)}
                  className="fixed inset-0 z-10"
                />
                <div className="absolute right-0 mt-1 w-32 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-1.5 animate-fade-in">
                  <button
                    onClick={() => { setEditingTask(task); setShowOptions(false); }}
                    className="flex items-center w-full px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <MdModeEdit className="mr-2 text-sm text-indigo-500" /> Edit
                  </button>
                  <button
                    onClick={() => { deleteTask(task.id); setShowOptions(false); }}
                    className="flex items-center w-full px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <MdDelete className="mr-2 text-sm text-rose-500" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Card Toggle Arrow */}
          <button 
            onClick={handleCardClick}
            className="p-1 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            {isExpanded ? <MdExpandLess className="text-lg" /> : <MdExpandMore className="text-lg" />}
          </button>
        </div>
      </div>

      {/* Expanded Content Area */}
      {isExpanded && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex flex-col gap-3 animate-fade-in">
          {/* Notes description block */}
          {task.note && (
            <div className="text-xs text-slate-600 bg-slate-50/50 border border-slate-100/50 rounded-xl p-3 leading-relaxed">
              <span className="block font-bold text-slate-700 mb-1">Notes:</span>
              <p className="whitespace-pre-line">{task.note}</p>
            </div>
          )}

          {/* Subtask Checklist */}
          {totalSubs > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Sub-tasks ({completedSubs}/{totalSubs})</span>
                <span>{subPct}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-1">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${subPct}%` }}
                />
              </div>

              {/* Subtask rows list */}
              <div className="flex flex-col gap-1.5 bg-slate-50/20 border border-slate-100/60 rounded-xl p-2.5">
                {subtasks.map(sub => (
                  <div key={sub.id} className="flex justify-between items-center gap-2">
                    <div className="flex items-center min-w-0">
                      <button
                        onClick={() => toggleSubtask(task.id, sub.id)}
                        className={`w-4.5 h-4.5 border border-slate-300 rounded-full cursor-pointer flex items-center justify-center mr-2 flex-shrink-0 transition-all ${
                          sub.completed ? 'bg-indigo-600 border-indigo-600' : 'bg-white hover:border-indigo-500'
                        }`}
                      >
                        {sub.completed && (
                          <span className="w-1 h-2 border-r border-b border-white rotate-45 mb-[1px]" />
                        )}
                      </button>
                      <span className={`text-xs truncate ${sub.completed ? 'line-through text-slate-400 font-medium' : 'text-slate-700'}`}>
                        {sub.text}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => deleteSubtask(task.id, sub.id)}
                      className="text-slate-300 hover:text-rose-500 text-[10px] font-bold p-0.5 cursor-pointer"
                      title="Delete subtask"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;