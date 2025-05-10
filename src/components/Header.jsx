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

  return (
    <div className="pt-4 pb-2 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-purple-600">TaskMaster</h1>
          <div className="text-sm text-gray-500">
            {day}, {date}
          </div>
        </div>
        <div className="bg-purple-100 rounded-lg py-1 px-3">
          <div className="text-xs text-purple-600">
            <span className="font-bold">{stats.remaining}</span> remaining
          </div>
          <div className="text-xs text-purple-600">
            <span className="font-bold">{stats.completed}</span> completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;