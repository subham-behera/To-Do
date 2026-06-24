import { CATEGORY_COLORS, PRIORITIES } from '../constants/taskCategories';

export const getCategoryColor = (categoryId, categories) => {
  const category = categories?.find(cat => cat.id === categoryId);
  if (!category) return 'bg-slate-50 text-slate-600 border border-slate-100/50';
  
  const color = CATEGORY_COLORS.find(c => c.id === category.colorId);
  if (!color) return 'bg-slate-50 text-slate-600 border border-slate-100/50';
  
  return `${color.bg} ${color.text} ${color.border}`;
};

export const getCategoryColorHex = (categoryId, categories) => {
  const category = categories?.find(cat => cat.id === categoryId);
  if (!category) return '#64748b'; // slate-500
  const color = CATEGORY_COLORS.find(c => c.id === category.colorId);
  return color ? color.hex : '#64748b';
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