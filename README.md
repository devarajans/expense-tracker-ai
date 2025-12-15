# 💸 Expense Tracker

A modern, professional expense tracking application built with Next.js 14, TypeScript, and Tailwind CSS. Track your personal finances with an intuitive interface, powerful analytics, and data persistence.

## ✨ Features

- **Add, Edit, Delete Expenses** - Full CRUD operations with form validation
- **Category Management** - Organize expenses into 6 categories (Food, Transportation, Entertainment, Shopping, Bills, Other)
- **Advanced Filtering** - Filter by category, date range, and search
- **Dashboard Analytics** - Visual insights with:
  - Summary cards (Total spending, monthly spending, average, expense count)
  - 30-day spending trend chart
  - Category breakdown with pie chart
- **CSV Export** - Export your filtered expenses to CSV
- **Data Persistence** - All data saved in browser localStorage
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Real-time Updates** - Instant feedback with toast notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd expense-tracker-ai
```

2. Install dependencies (if not already installed):

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 How to Use

### Dashboard Page

1. **View Summary Stats** - See your total spending, monthly spending, and top categories at a glance
2. **Add Expense** - Click the "Add Expense" button to open the expense form
3. **View Charts** - Analyze your spending patterns with interactive charts
4. **Recent Expenses** - See your 5 most recent expenses

### Expenses Page

1. **View All Expenses** - See a complete list of all your expenses
2. **Filter Expenses** - Use the filter bar to:
   - Search by description, category, or amount
   - Filter by category
   - Filter by date range
3. **Sort Expenses** - Click sort buttons to sort by date, amount, or category
4. **Export Data** - Click "Export CSV" to download your filtered expenses
5. **Edit/Delete** - Click the edit or delete icon on any expense item

### Adding an Expense

1. Click "Add Expense" button
2. Fill in the form:
   - **Date** - Select the expense date
   - **Amount** - Enter the amount in dollars
   - **Category** - Choose a category
   - **Description** - Add details about the expense
3. Click "Add Expense" to save

### Editing an Expense

1. Click the edit icon on any expense
2. Modify the fields in the form
3. Click "Update Expense" to save changes

### Deleting an Expense

1. Click the delete icon on any expense
2. Confirm the deletion in the popup

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Notifications:** react-hot-toast
- **State Management:** React Context API
- **Data Persistence:** localStorage

## 📁 Project Structure

```
expense-tracker-ai/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard page
│   ├── expenses/          # Expenses list page
│   └── globals.css        # Global styles & Tailwind config
├── components/
│   ├── dashboard/         # Dashboard components
│   ├── expenses/          # Expense management components
│   ├── layout/            # Header and navigation
│   └── ui/                # Reusable UI components
├── context/               # React Context for state management
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, types, and constants
└── public/                # Static assets
```

## 🧪 Testing the Application

### Test Scenario 1: Basic Expense Management
1. Add 3-5 expenses with different categories
2. Edit one expense
3. Delete one expense
4. Verify data persists after page refresh

### Test Scenario 2: Filtering and Search
1. Add expenses in multiple categories
2. Filter by each category
3. Search for specific keywords
4. Filter by date range
5. Reset filters

### Test Scenario 3: Analytics
1. Add multiple expenses over different dates
2. Check the dashboard summary cards
3. Verify the spending trend chart shows data
4. Check category breakdown percentages

### Test Scenario 4: Export
1. Add several expenses
2. Apply filters
3. Export to CSV
4. Verify CSV contains correct data

### Test Scenario 5: Responsive Design
1. Open app on desktop
2. Resize browser to tablet width
3. Resize to mobile width
4. Verify all features work on all screen sizes

## 🎨 Customization

### Changing Colors

Edit `app/globals.css` to customize the color scheme:

```css
--color-primary: #3b82f6;  /* Primary blue */
--color-secondary: #6366f1; /* Secondary indigo */
--color-success: #10b981;   /* Success green */
--color-warning: #f59e0b;   /* Warning amber */
--color-danger: #ef4444;    /* Danger red */
```

### Adding Categories

Edit `lib/constants.ts` to add or modify expense categories:

```typescript
export const CATEGORIES: Category[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
  // Add your categories here
];
```

## 🔒 Data Privacy

All your expense data is stored locally in your browser's localStorage. No data is sent to any server. Your financial information stays private and secure on your device.

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!
