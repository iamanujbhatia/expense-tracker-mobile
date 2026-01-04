import { describe, it, expect } from "vitest";
import {
  getMonthString,
  calculateMonthlyStats,
  formatCurrency,
  formatDate,
  getTodayString,
  getPreviousMonth,
  getNextMonth,
  sortTransactionsByDate,
  filterByCategory,
  filterByType,
  searchTransactions,
} from "../calculations";
import { Transaction } from "../types";

describe("Calculations", () => {
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "expense",
      amount: 1500,
      category: "Food",
      date: "2024-01-15",
      notes: "Lunch",
      createdAt: Date.now(),
    },
    {
      id: "2",
      type: "income",
      amount: 500000,
      category: "Salary",
      date: "2024-01-01",
      notes: "Monthly salary",
      createdAt: Date.now(),
    },
    {
      id: "3",
      type: "expense",
      amount: 5000,
      category: "Transport",
      date: "2024-01-20",
      notes: "Gas",
      createdAt: Date.now(),
    },
    {
      id: "4",
      type: "expense",
      amount: 2000,
      category: "Food",
      date: "2024-02-10",
      notes: "Dinner",
      createdAt: Date.now(),
    },
  ];

  describe("getMonthString", () => {
    it("should return current month in YYYY-MM format", () => {
      const result = getMonthString();
      expect(result).toMatch(/^\d{4}-\d{2}$/);
    });
  });

  describe("calculateMonthlyStats", () => {
    it("should calculate stats for January 2024", () => {
      const stats = calculateMonthlyStats(mockTransactions, "2024-01");
      expect(stats.month).toBe("2024-01");
      expect(stats.totalIncome).toBe(500000);
      expect(stats.totalExpenses).toBe(6500); // 1500 + 5000
      expect(stats.netBalance).toBe(493500);
    });

    it("should calculate stats for February 2024", () => {
      const stats = calculateMonthlyStats(mockTransactions, "2024-02");
      expect(stats.totalIncome).toBe(0);
      expect(stats.totalExpenses).toBe(2000);
      expect(stats.netBalance).toBe(-2000);
    });

    it("should aggregate by category", () => {
      const stats = calculateMonthlyStats(mockTransactions, "2024-01");
      expect(stats.byCategory["Food"]).toBe(1500);
      expect(stats.byCategory["Transport"]).toBe(5000);
      expect(stats.byCategory["Salary"]).toBe(500000);
    });
  });

  describe("formatCurrency", () => {
    it("should format amount in cents to USD currency", () => {
      expect(formatCurrency(1500)).toBe("$15.00");
      expect(formatCurrency(500000)).toBe("$5,000.00");
      expect(formatCurrency(100)).toBe("$1.00");
    });

    it("should handle zero amount", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });
  });

  describe("formatDate", () => {
    it("should format date string to readable format", () => {
      const result = formatDate("2024-01-15");
      expect(result).toContain("Jan");
      expect(result).toContain("15");
      expect(result).toContain("2024");
    });
  });

  describe("getTodayString", () => {
    it("should return today's date in YYYY-MM-DD format", () => {
      const result = getTodayString();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe("getPreviousMonth", () => {
    it("should return previous month", () => {
      expect(getPreviousMonth("2024-02")).toBe("2024-01");
      expect(getPreviousMonth("2024-01")).toBe("2023-12");
    });
  });

  describe("getNextMonth", () => {
    it("should return next month", () => {
      expect(getNextMonth("2024-01")).toBe("2024-02");
      expect(getNextMonth("2024-12")).toBe("2025-01");
    });
  });

  describe("sortTransactionsByDate", () => {
    it("should sort transactions by date (newest first)", () => {
      const sorted = sortTransactionsByDate(mockTransactions);
      expect(sorted[0].date).toBe("2024-02-10");
      expect(sorted[sorted.length - 1].date).toBe("2024-01-01");
    });
  });

  describe("filterByCategory", () => {
    it("should filter transactions by category", () => {
      const filtered = filterByCategory(mockTransactions, "Food");
      expect(filtered.length).toBe(2);
      expect(filtered.every((t) => t.category === "Food")).toBe(true);
    });

    it("should return empty array for non-existent category", () => {
      const filtered = filterByCategory(mockTransactions, "NonExistent");
      expect(filtered.length).toBe(0);
    });
  });

  describe("filterByType", () => {
    it("should filter transactions by type", () => {
      const expenses = filterByType(mockTransactions, "expense");
      expect(expenses.length).toBe(3);
      expect(expenses.every((t) => t.type === "expense")).toBe(true);

      const incomes = filterByType(mockTransactions, "income");
      expect(incomes.length).toBe(1);
      expect(incomes.every((t) => t.type === "income")).toBe(true);
    });
  });

  describe("searchTransactions", () => {
    it("should search transactions by notes", () => {
      const results = searchTransactions(mockTransactions, "lunch");
      expect(results.length).toBe(1);
      expect(results[0].notes).toContain("Lunch");
    });

    it("should search transactions by category", () => {
      const results = searchTransactions(mockTransactions, "food");
      expect(results.length).toBe(2);
    });

    it("should be case insensitive", () => {
      const results = searchTransactions(mockTransactions, "SALARY");
      expect(results.length).toBe(1);
    });
  });
});
