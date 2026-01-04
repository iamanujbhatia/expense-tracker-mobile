/**
 * AsyncStorage utilities for persisting app data
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Transaction,
  Category,
  AppSettings,
  DEFAULT_CATEGORIES,
  DEFAULT_SETTINGS,
} from "./types";

const STORAGE_KEYS = {
  TRANSACTIONS: "expense_tracker_transactions",
  CATEGORIES: "expense_tracker_categories",
  SETTINGS: "expense_tracker_settings",
};

// Transactions
export async function loadTransactions(): Promise<Transaction[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading transactions:", error);
    return [];
  }
}

export async function saveTransactions(transactions: Transaction[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error("Error saving transactions:", error);
  }
}

export async function addTransaction(transaction: Transaction): Promise<void> {
  const transactions = await loadTransactions();
  transactions.push(transaction);
  await saveTransactions(transactions);
}

export async function updateTransaction(transaction: Transaction): Promise<void> {
  const transactions = await loadTransactions();
  const index = transactions.findIndex((t) => t.id === transaction.id);
  if (index !== -1) {
    transactions[index] = transaction;
    await saveTransactions(transactions);
  }
}

export async function deleteTransaction(id: string): Promise<void> {
  const transactions = await loadTransactions();
  await saveTransactions(transactions.filter((t) => t.id !== id));
}

// Categories
export async function loadCategories(): Promise<Category[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  } catch (error) {
    console.error("Error loading categories:", error);
    return DEFAULT_CATEGORIES;
  }
}

export async function saveCategories(categories: Category[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error("Error saving categories:", error);
  }
}

export async function addCategory(category: Category): Promise<void> {
  const categories = await loadCategories();
  categories.push(category);
  await saveCategories(categories);
}

export async function updateCategory(category: Category): Promise<void> {
  const categories = await loadCategories();
  const index = categories.findIndex((c) => c.id === category.id);
  if (index !== -1) {
    categories[index] = category;
    await saveCategories(categories);
  }
}

export async function deleteCategory(id: string): Promise<void> {
  const categories = await loadCategories();
  await saveCategories(categories.filter((c) => c.id !== id));
}

// Settings
export async function loadSettings(): Promise<AppSettings> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error loading settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings:", error);
  }
}

// Clear all data
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TRANSACTIONS,
      STORAGE_KEYS.CATEGORIES,
      STORAGE_KEYS.SETTINGS,
    ]);
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}
