import { CATEGORIES, PRIORITIES } from '../constants/taskCategories';

export const getCategoryColor = (categoryId) => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.color : 'bg-gray-200';
};

export const getPriorityColor = (priorityId) => {
  const priority = PRIORITIES.find(p => p.id === priorityId);
  return priority ? priority.color : '';
};

export const formatDate = () => {
  const today = new Date();
  const date = `${today.getDate()} ${today.toLocaleString('en-US', { month: 'long' })} ${today.getFullYear()}`;
  const day = today.toLocaleString('en-US', { weekday: 'long' });
  return { date, day };
};