import { useTaskContext } from '../contexts/TaskContext';
import { getCategoryColor, getCategoryColorHex } from '../utils/taskUtils';
import { PRIORITIES } from '../constants/taskCategories';
import { MdCheckCircleOutline, MdOutlineHourglassEmpty, MdAnalytics } from 'react-icons/md';

const AnalyticsView = () => {
  const { tasks, categories, stats } = useTaskContext();

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // Calculate task distribution by category
  const categoriesWithStats = categories.map(cat => {
    const catTasks = tasks.filter(t => t.category === cat.id);
    const total = catTasks.length;
    const completed = catTasks.filter(t => t.completed).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { ...cat, total, completed, pct };
  }).filter(c => c.total > 0); // only show categories that have tasks

  // Calculate task distribution by priority
  const prioritiesWithStats = PRIORITIES.map(p => {
    const pTasks = tasks.filter(t => t.priority === p.id);
    const total = pTasks.length;
    const completed = pTasks.filter(t => t.completed).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { ...p, total, completed, pct };
  });

  const getProductivityMessage = () => {
    if (stats.total === 0) return "Add some tasks to start tracking metrics!";
    if (completionRate === 100) return "Amazing job! You have cleared your schedule!";
    if (completionRate >= 75) return "Excellent progress! You are close to finishing everything.";
    if (completionRate >= 50) return "Good work! Keep the momentum going.";
    if (completionRate >= 25) return "You've made a start! Focus on the high priority tasks next.";
    return "Make today productive. Take it one task at a time!";
  };

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Motivation message card */}
      <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-4 flex gap-3 items-center">
        <MdAnalytics className="text-3xl text-indigo-600 flex-shrink-0" />
        <div>
          <h4 className="text-xs font-bold text-slate-800">Productivity Status</h4>
          <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-relaxed">
            {getProductivityMessage()}
          </p>
        </div>
      </div>

      {/* Basic Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <MdCheckCircleOutline className="text-lg" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold leading-none">Completed</div>
            <div className="text-base font-extrabold text-slate-800 mt-1.5 leading-none">
              {stats.completed} <span className="text-[10px] text-slate-400 font-normal">/ {stats.total}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <MdOutlineHourglassEmpty className="text-lg" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold leading-none">Remaining</div>
            <div className="text-base font-extrabold text-slate-800 mt-1.5 leading-none">
              {stats.remaining} <span className="text-[10px] text-slate-400 font-normal">tasks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress by Category */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Completion by Category
        </h3>
        
        {categoriesWithStats.length === 0 ? (
          <div className="text-center py-6 text-slate-400 border border-dashed border-slate-200 rounded-2xl text-xs font-medium">
            No categorized tasks to display analytics for.
          </div>
        ) : (
          <div className="flex flex-col gap-3.5 bg-white border border-slate-100 rounded-2xl p-4">
            {categoriesWithStats.map(cat => {
              const hexColor = getCategoryColorHex(cat.id, categories);
              return (
                <div key={cat.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getCategoryColor(cat.id, categories)}`}>
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600">
                      {cat.completed} / {cat.total} ({cat.pct}%)
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 ease-out" 
                      style={{ 
                        width: `${cat.pct}%`,
                        backgroundColor: hexColor
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Distribution by Priority */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Tasks by Priority
        </h3>
        
        <div className="flex flex-col gap-3.5 bg-white border border-slate-100 rounded-2xl p-4">
          {prioritiesWithStats.map(priority => {
            const hasTasks = priority.total > 0;
            return (
              <div key={priority.id} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${priority.color}`}>
                    {priority.name}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600">
                    {hasTasks ? `${priority.completed} / ${priority.total} completed` : '0 tasks'}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      priority.id === 'high' ? 'bg-rose-500' : priority.id === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${hasTasks ? priority.pct : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
