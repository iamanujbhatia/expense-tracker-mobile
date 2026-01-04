# Expense Tracker Mobile App - Design Document

## Overview

A personal expense tracker mobile app designed for iOS/Android that helps users log income and expenses, organize them by category, and view monthly financial summaries. The app prioritizes quick data entry and clear financial insights.

---

## Screen List

1. **Home / Dashboard** — Overview of current month's balance, recent transactions, and quick-access buttons
2. **Add Transaction** — Modal form to log income or expense with category selection
3. **Transactions List** — Chronological view of all transactions with filtering and search
4. **Monthly Summary** — Charts and statistics for the current/selected month
5. **Categories** — Manage expense categories (view, edit, create)
6. **Settings** — App preferences and data management

---

## Primary Content and Functionality

### Home / Dashboard Screen
- **Header**: Current month and year
- **Balance Card**: Display total income, total expenses, and net balance for the month
- **Quick Stats**: Visual indicators (cards or mini-charts) showing top spending categories
- **Recent Transactions**: Last 5–10 transactions in chronological order (newest first)
- **Action Buttons**: 
  - "Add Income" button (green, prominent)
  - "Add Expense" button (red, prominent)
  - "View All Transactions" link
  - "View Monthly Summary" link

### Add Transaction Modal
- **Transaction Type Toggle**: Income / Expense selector
- **Amount Input**: Numeric field with currency symbol
- **Category Dropdown**: Pre-defined categories (e.g., Food, Transport, Salary, Freelance)
- **Date Picker**: Default to today; allow past/future dates
- **Notes Field** (optional): Short description
- **Save Button**: Confirm and close modal
- **Cancel Button**: Discard and close modal

### Transactions List Screen
- **Filter/Sort Options**: 
  - Filter by category
  - Filter by transaction type (income/expense)
  - Sort by date (newest/oldest) or amount
- **Search Bar**: Quick search by notes or category
- **Transaction Items**: Each shows amount, category, date, and notes (if any)
- **Swipe Actions** (optional): Delete or edit transaction
- **Month Navigation**: Arrows to browse previous/next months

### Monthly Summary Screen
- **Month Selector**: Navigate between months
- **Summary Cards**:
  - Total Income (green)
  - Total Expenses (red)
  - Net Balance (neutral or color-coded)
- **Category Breakdown**: 
  - Pie chart or bar chart showing expense distribution by category
  - List view with category totals and percentages
- **Trend Indicator**: Compare to previous month (up/down/same)

### Categories Screen
- **Category List**: All active categories with their color/icon
- **Add Category Button**: Create new category
- **Edit/Delete Actions**: Modify or remove categories
- **Category Details**: Name, icon, color, usage count

### Settings Screen
- **App Preferences**:
  - Currency selection
  - Theme (light/dark)
  - Default transaction type
- **Data Management**:
  - Export data (CSV)
  - Clear all data (with confirmation)
  - App version info

---

## Key User Flows

### Flow 1: Log an Expense
1. User taps "Add Expense" on home screen
2. Modal opens with "Expense" pre-selected
3. User enters amount (e.g., 12.50)
4. User selects category (e.g., "Food")
5. User optionally adds notes (e.g., "Lunch at café")
6. User confirms date (defaults to today)
7. User taps "Save"
8. Transaction is stored; modal closes; home screen refreshes to show updated balance

### Flow 2: View Monthly Summary
1. User taps "View Monthly Summary" on home screen
2. Summary screen loads showing current month's stats
3. User sees total income, total expenses, and net balance
4. User sees pie chart of expense distribution
5. User can navigate to previous/next months using arrows
6. User can tap on a category in the chart to filter transactions by that category

### Flow 3: Search and Filter Transactions
1. User navigates to "Transactions List" screen
2. User taps search bar and types keyword (e.g., "coffee")
3. List filters to show matching transactions
4. User can further filter by category or type using dropdown filters
5. User can tap a transaction to view/edit details

---

## Color Choices

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| **Primary Accent** | Teal Blue | #0a7ea4 | Buttons, highlights, active states |
| **Income** | Green | #22C55E | Income transactions, positive balance |
| **Expense** | Red | #EF4444 | Expense transactions, negative balance |
| **Background** | White (Light) / Dark Gray (Dark) | #ffffff / #151718 | Screen background |
| **Surface** | Light Gray (Light) / Darker Gray (Dark) | #f5f5f5 / #1e2022 | Cards, modals |
| **Text Primary** | Dark Gray (Light) / Light Gray (Dark) | #11181C / #ECEDEE | Main text |
| **Text Secondary** | Medium Gray (Light) / Muted Gray (Dark) | #687076 / #9BA1A6 | Secondary text, labels |
| **Border** | Light Border (Light) / Dark Border (Dark) | #E5E7EB / #334155 | Dividers, card borders |
| **Category: Food** | Orange | #F59E0B | Food & dining |
| **Category: Transport** | Blue | #3B82F6 | Transportation |
| **Category: Entertainment** | Purple | #8B5CF6 | Entertainment |
| **Category: Utilities** | Amber | #FBBF24 | Bills & utilities |
| **Category: Other** | Gray | #6B7280 | Miscellaneous |

---

## Layout Principles

- **Portrait Orientation**: All screens designed for portrait (9:16) with one-handed usage in mind
- **Safe Area**: Content respects notch and home indicator areas
- **Touch Targets**: Buttons and interactive elements are at least 44×44 pt
- **Spacing**: Consistent 16pt padding/margins throughout
- **Typography**: 
  - Headings: 24–32pt, bold
  - Body: 16pt, regular
  - Labels: 14pt, medium
  - Small text: 12pt, regular

---

## Navigation Structure

```
Tab Bar (Bottom)
├── Home (Dashboard)
│   ├── → Add Transaction (Modal)
│   ├── → Transactions List
│   └── → Monthly Summary
├── Transactions
│   ├── List with filters/search
│   └── → Transaction Detail (edit/delete)
├── Summary
│   └── Monthly breakdown & charts
└── Settings
    ├── Preferences
    └── Data Management
```

---

## Data Model (Local Storage)

### Transaction
- `id`: UUID
- `type`: "income" | "expense"
- `amount`: number (cents or smallest unit)
- `category`: string (category name)
- `date`: ISO 8601 date string
- `notes`: string (optional)
- `createdAt`: timestamp

### Category
- `id`: UUID
- `name`: string
- `color`: hex color code
- `icon`: string (emoji or icon name)
- `type`: "income" | "expense" | "both"

### AppSettings
- `currency`: string (e.g., "USD", "EUR")
- `theme`: "light" | "dark" | "auto"
- `defaultTransactionType`: "income" | "expense"

---

## Interaction Feedback

- **Button Press**: Scale 0.97 + light haptic feedback
- **Transaction Added**: Success notification + haptic
- **Delete Action**: Confirmation dialog + warning haptic
- **List Scroll**: Smooth, no jank
- **Modal Open/Close**: Fade animation (200ms)

