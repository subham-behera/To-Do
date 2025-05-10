import TaskItem from "./TaskItem";
import { useTaskContext } from '../contexts/TaskContext';

const TaskList = () => {
  const { sortedTasks } = useTaskContext();

  return (
    <div className="h-64 px-6 overflow-y-auto">
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="text-lg mb-2">No tasks found</div>
          <div className="text-sm">Add a new task to get started</div>
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