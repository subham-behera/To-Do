# TaskMaster 📝

A clean, feature-rich, mobile-ready To-Do dashboard application built with **React** and **Vite**. TaskMaster helps you manage tasks with custom categories, sub-task checklists, notes, analytics, and a responsive dual-layout dashboard.

---

## ✨ Features

- **📱 Responsive Dashboard** — Two-column layout on desktop (sidebar + task panel); a native-feeling mobile app with bottom tab navigation on small screens.
- **✅ Task Management** — Create, edit, complete, and archive tasks with ease.
- **📋 Sub-task Checklists** — Break tasks into checklist items with completion progress bars.
- **📝 Task Notes** — Add descriptions or notes to any task, visible when expanding the card.
- **🏷️ Custom Categories** — Create your own categories with a 8-color palette picker; all stored in `localStorage`.
- **🔥 Priority Levels** — Tag tasks as High, Medium, or Low priority with color-coded badges.
- **📅 Due Dates** — Assign due dates to tasks for time-based sorting.
- **🔍 Search & Filter** — Search tasks by name; filter by status (All / Active / Completed), category, or priority.
- **↕️ Sorting** — Sort tasks by creation date, due date, or priority.
- **📊 Analytics View** — Visualize completion rates by category and priority with progress bars.
- **🗂️ Archive** — Bulk-archive all completed tasks to declutter your workspace.
- **💾 Persistent Storage** — All tasks and categories are saved to `localStorage`.

---

## 🖼️ UI Layout

### Desktop
```
┌──────────────────────┬────────────────────────────┐
│   Sidebar Panel      │   Main Task Panel          │
│  ─────────────────   │  ────────────────────────  │
│  Categories          │  Header + Progress Ring    │
│  [+ Create Custom]   │  Search & Filter Bar       │
│                      │  Task List (expandable)    │
│  Workspace Metrics   │  + FAB (Add Task)          │
│  [Analytics View]    │                            │
└──────────────────────┴────────────────────────────┘
```

### Mobile (Bottom Tab Navigation)
```
┌────────────────────────┐
│  Header + Progress     │
│  ──────────────────    │
│  (Active Tab Content)  │
│  Tasks / Categories /  │
│  Analytics             │
│                        │
│  [FAB Add Task]        │
├────────────────────────┤
│  📋 Tasks  🏷️ Cat  📊 │  ← Bottom Tab Bar
└────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation
```bash
# Clone the repo
git clone <your-repo-url>
cd to-do

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

The production-ready output will be in the `dist/` folder.

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── AnalyticsView.jsx   # Completion stats + category & priority charts
│   ├── CategoryManager.jsx # Create/delete custom categories with color picker
│   ├── FilterBar.jsx       # Search, status filter pills, category/priority/sort selectors
│   ├── Header.jsx          # Title, date, and SVG circular progress ring
│   ├── TaskForm.jsx        # Bottom sheet form for creating/editing tasks
│   ├── TaskItem.jsx        # Expandable task card with sub-tasks and notes
│   └── TaskList.jsx        # Renders the sorted, filtered task list
├── constants/
│   └── taskCategories.js   # Default categories, PRIORITIES, and CATEGORY_COLORS palette
├── contexts/
│   └── TaskContext.jsx     # Global state: tasks, categories, filters, sub-task actions
├── hooks/
│   └── useLocalStorage.js  # Persistent state hook backed by localStorage
├── utils/
│   └── taskUtils.js        # Color lookup helpers and date formatter
├── App.jsx                 # Root layout: desktop sidebar + mobile tab-bar + drawer
├── main.jsx                # React entry point
└── index.css               # Tailwind CSS v4 + custom animations + checkbox styles
```

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| [React 19](https://react.dev/) | UI framework |
| [Vite 6](https://vitejs.dev/) | Build tool and dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [react-icons](https://react-icons.github.io/react-icons/) | Icon library (MD, BS, Go sets) |
| [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Client-side persistence |

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

---

## 📄 License

MIT — feel free to use and modify this project.
