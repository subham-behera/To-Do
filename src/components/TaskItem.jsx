import { useState } from "react";
import { MdModeEdit, MdDelete, MdOutlineCalendarToday, MdDragIndicator } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTaskContext } from '../contexts/TaskContext';
import { getCategoryColor, getPriorityColor } from '../utils/taskUtils';
import { CATEGORIES, PRIORITIES } from '../constants/taskCategories';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showOptions, setShowOptions] = useState(false);
  
  const handleSave = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
    setShowOptions(false);
  };

  return (
    <div className={`flex flex-col w-full mb-2 p-3 rounded-lg shadow-sm ${task.completed ? 'bg-gray-100' : 'bg-white'} transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MdDragIndicator className="text-gray-400 mr-2 cursor-grab" />
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => updateTask(task.id, { ...task, completed: !task.completed })}
            className="mr-3 h-5 w-5 accent-purple-500"
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          {isEditing ? (
            <input
              type="text"
              value={editedTask.text}
              onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              autoFocus
            />
          ) : (
            <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {task.text}
            </span>
          )}
          
          {!isEditing && (
            <div className="flex items-center mt-1 text-xs text-gray-500">
              {task.dueDate && (
                <div className="flex items-center mr-3">
                  <MdOutlineCalendarToday className="mr-1" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
              
              {task.category && (
                <span className={`px-2 py-0.5 rounded-full mr-3 ${getCategoryColor(task.category)}`}>
                  {CATEGORIES.find(cat => cat.id === task.category)?.name}
                </span>
              )}
              
              {task.priority && (
                <span className={`px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                  {PRIORITIES.find(p => p.id === task.priority)?.name}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="p-1 rounded-full text-white bg-purple-500 hover:bg-purple-600"
            >
              <FaSave className="text-lg" />
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <BsThreeDotsVertical className="text-gray-600 text-lg" />
              </button>
              
              {showOptions && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 py-1">
                  <button
                    onClick={() => { setIsEditing(true); setShowOptions(false); }}
                    className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    <MdModeEdit className="mr-2 text-purple-500" /> Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    <MdDelete className="mr-2 text-red-500" /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isEditing && (
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Due Date</label>
            <input
              type="date"
              value={editedTask.dueDate || ''}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              className="w-full p-1 text-sm border rounded-md"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            <select
              value={editedTask.category || ''}
              onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
              className="w-full p-1 text-sm border rounded-md"
            >
              <option value="">Select</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Priority</label>
            <select
              value={editedTask.priority || ''}
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
              className="w-full p-1 text-sm border rounded-md"
            >
              <option value="">Select</option>
              {PRIORITIES.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;