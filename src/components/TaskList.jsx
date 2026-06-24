import TaskItem from "./TaskItem";
import { useTaskContext } from '../contexts/TaskContext';

const TaskList = () => {
  const { sortedTasks } = useTaskContext();

  return (
    <div className="px-6 flex-1">
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <span className="text-sm font-bold text-slate-300">No tasks found</span>
          <span className="text-xs text-slate-400 mt-1">Tap the plus button to add a task</span>
        </div>
      ) : (
        sortedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;