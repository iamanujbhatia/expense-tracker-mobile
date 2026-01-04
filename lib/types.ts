/**
 * Data types and models for the Expense Tracker app
 */

export type TransactionType = "income" | "expense";
export type CategoryType = "income" | "expense" | "both";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // in cents (e.g., 1250 = $12.50)
  category: string;
  date: string; // ISO 8601 date (YYYY-MM-DD)
  notes: string;
  createdAt: number; // timestamp in ms
}

export interface Category {
  id: string;
  name: string;
  color: string; // hex color code
  icon: string; // emoji or icon name
  type: CategoryType;
}

export interface MonthlyStats {
  month: string; // YYYY-MM
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  byCategory: Record<string, number>; // category name -> total amount
}

export interface AppSettings {
  currency: string; // e.g., "USD", "EUR"
  theme: "light" | "dark" | "auto";
  defaultTransactionType: TransactionType;
}

// Default categories
export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-food",
    name: "Food",
    color: "#F59E0B",
    icon: "🍽️",
    type: "expense",
  },
  {
    id: "cat-transport",
    name: "Transport",
    color: "#3B82F6",
    icon: "🚗",
    type: "expense",
  },
  {
    id: "cat-entertainment",
    name: "Entertainment",
    color: "#8B5CF6",
    icon: "🎬",
    type: "expense",
  },
  {
    id: "cat-utilities",
    name: "Utilities",
    color: "#FBBF24",
    icon: "💡",
    type: "expense",
  },
  {
    id: "cat-shopping",
    name: "Shopping",
    color: "#EC4899",
    icon: "🛍️",
    type: "expense",
  },
  {
    id: "cat-health",
    name: "Health",
    color: "#10B981",
    icon: "⚕️",
    type: "expense",
  },
  {
    id: "cat-other",
    name: "Other",
    color: "#6B7280",
    icon: "📌",
    type: "expense",
  },
  {
    id: "cat-salary",
    name: "Salary",
    color: "#22C55E",
    icon: "💰",
    type: "income",
  },
  {
    id: "cat-freelance",
    name: "Freelance",
    color: "#06B6D4",
    icon: "💻",
    type: "income",
  },
  {
    id: "cat-investment",
    name: "Investment",
    color: "#8B5CF6",
    icon: "📈",
    type: "income",
  },
];

export const DEFAULT_SETTINGS: AppSettings = {
  currency: "USD",
  theme: "auto",
  defaultTransactionType: "expense",
};
