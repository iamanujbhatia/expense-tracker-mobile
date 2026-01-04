/**
 * Utility functions for financial calculations and data aggregation
 */

import { Transaction, MonthlyStats } from "./types";

/**
 * Get the month string from a date (YYYY-MM format)
 */
export function getMonthString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Get the first day of a given month
 */
export function getMonthStart(monthString: string): Date {
  const [year, month] = monthString.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

/**
 * Get the last day of a given month
 */
export function getMonthEnd(monthString: string): Date {
  const [year, month] = monthString.split("-").map(Number);
  return new Date(year, month, 0);
}

/**
 * Filter transactions by month
 */
export function getTransactionsByMonth(
  transactions: Transaction[],
  monthString: string
): Transaction[] {
  return transactions.filter((t) => t.date.startsWith(monthString));
}

/**
 * Calculate monthly statistics
 */
export function calculateMonthlyStats(
  transactions: Transaction[],
  monthString: string
): MonthlyStats {
  const monthTransactions = getTransactionsByMonth(transactions, monthString);

  let totalIncome = 0;
  let totalExpenses = 0;
  const byCategory: Record<string, number> = {};

  monthTransactions.forEach((t) => {
    if (t.type === "income") {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
    }

    if (!byCategory[t.category]) {
      byCategory[t.category] = 0;
    }
    byCategory[t.category] += t.amount;
  });

  return {
    month: monthString,
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
    byCategory,
  };
}

/**
 * Format amount as currency string
 */
export function formatCurrency(amountInCents: number, currency: string = "USD"): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Format date to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Get previous month string
 */
export function getPreviousMonth(monthString: string): string {
  const [year, month] = monthString.split("-").map(Number);
  if (month === 1) {
    return `${year - 1}-12`;
  }
  return `${year}-${String(month - 1).padStart(2, "0")}`;
}

/**
 * Get next month string
 */
export function getNextMonth(monthString: string): string {
  const [year, month] = monthString.split("-").map(Number);
  if (month === 12) {
    return `${year + 1}-01`;
  }
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

/**
 * Get month display name
 */
export function getMonthName(monthString: string): string {
  const [year, month] = monthString.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/**
 * Sort transactions by date (newest first)
 */
export function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Get recent transactions
 */
export function getRecentTransactions(
  transactions: Transaction[],
  limit: number = 10
): Transaction[] {
  return sortTransactionsByDate(transactions).slice(0, limit);
}

/**
 * Filter transactions by category
 */
export function filterByCategory(
  transactions: Transaction[],
  category: string
): Transaction[] {
  return transactions.filter((t) => t.category === category);
}

/**
 * Filter transactions by type
 */
export function filterByType(
  transactions: Transaction[],
  type: "income" | "expense"
): Transaction[] {
  return transactions.filter((t) => t.type === type);
}

/**
 * Search transactions by notes
 */
export function searchTransactions(
  transactions: Transaction[],
  query: string
): Transaction[] {
  const lowerQuery = query.toLowerCase();
  return transactions.filter(
    (t) =>
      t.notes.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
  );
}
