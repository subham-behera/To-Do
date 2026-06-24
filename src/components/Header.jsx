import { useEffect, useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { formatDate } from '../utils/taskUtils';

const Header = () => {
  const { stats } = useTaskContext();
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  
  useEffect(() => {
    const { date: formattedDate, day: formattedDay } = formatDate();
    setDate(formattedDate);
    setDay(formattedDay);
  }, []);

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="pt-6 pb-4 px-6 flex justify-between items-center bg-white">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          TaskMaster<span className="text-indigo-600">.</span>
        </h1>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">
          {day}, {date}
        </p>
      </div>
      
      <div className="flex items-center gap-3 bg-slate-50/80 border border-slate-100/60 rounded-2xl p-2 pr-3.5">
        {/* SVG Circular Progress Circle */}
        <div className="relative flex items-center justify-center">
          <svg className="w-11 h-11 transform -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="16"
              className="stroke-slate-200 fill-none"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r="16"
              className="stroke-indigo-600 fill-none transition-all duration-500 ease-out"
              strokeWidth="2.5"
              strokeDasharray={100.5}
              strokeDashoffset={100.5 - (completionRate / 100) * 100.5}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[9px] font-bold text-slate-700">{completionRate}%</span>
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-800 leading-none">
            {stats.remaining} left
          </span>
          <span className="text-[10px] font-semibold text-slate-400 mt-1 leading-none">
            {stats.completed} done
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;