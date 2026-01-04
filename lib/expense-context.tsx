/**
 * Expense Tracker Context and Provider
 * Manages global state for transactions, categories, and settings
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import {
  Transaction,
  Category,
  AppSettings,
  DEFAULT_CATEGORIES,
  DEFAULT_SETTINGS,
} from "./types";
import {
  loadTransactions,
  saveTransactions,
  loadCategories,
  saveCategories,
  loadSettings,
  saveSettings,
} from "./storage";

interface ExpenseState {
  transactions: Transaction[];
  categories: Category[];
  settings: AppSettings;
  isLoading: boolean;
}

type ExpenseAction =
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "UPDATE_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "ADD_CATEGORY"; payload: Category }
  | { type: "UPDATE_CATEGORY"; payload: Category }
  | { type: "DELETE_CATEGORY"; payload: string }
  | { type: "SET_SETTINGS"; payload: AppSettings }
  | { type: "UPDATE_SETTINGS"; payload: Partial<AppSettings> }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: ExpenseState = {
  transactions: [],
  categories: DEFAULT_CATEGORIES,
  settings: DEFAULT_SETTINGS,
  isLoading: true,
};

function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [...state.transactions, action.payload] };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };
    case "SET_SETTINGS":
      return { ...state, settings: action.payload };
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface ExpenseContextType extends ExpenseState {
  addTransaction: (transaction: Transaction) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  loadData: () => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const [transactions, categories, settings] = await Promise.all([
        loadTransactions(),
        loadCategories(),
        loadSettings(),
      ]);
      dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      dispatch({ type: "SET_CATEGORIES", payload: categories });
      dispatch({ type: "SET_SETTINGS", payload: settings });
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addTransaction = async (transaction: Transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    const updated = [...state.transactions, transaction];
    await saveTransactions(updated);
  };

  const updateTransaction = async (transaction: Transaction) => {
    dispatch({ type: "UPDATE_TRANSACTION", payload: transaction });
    const updated = state.transactions.map((t) =>
      t.id === transaction.id ? transaction : t
    );
    await saveTransactions(updated);
  };

  const deleteTransaction = async (id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
    const updated = state.transactions.filter((t) => t.id !== id);
    await saveTransactions(updated);
  };

  const addCategory = async (category: Category) => {
    dispatch({ type: "ADD_CATEGORY", payload: category });
    const updated = [...state.categories, category];
    await saveCategories(updated);
  };

  const updateCategory = async (category: Category) => {
    dispatch({ type: "UPDATE_CATEGORY", payload: category });
    const updated = state.categories.map((c) =>
      c.id === category.id ? category : c
    );
    await saveCategories(updated);
  };

  const deleteCategory = async (id: string) => {
    dispatch({ type: "DELETE_CATEGORY", payload: id });
    const updated = state.categories.filter((c) => c.id !== id);
    await saveCategories(updated);
  };

  const updateSettings = async (settings: Partial<AppSettings>) => {
    const updated = { ...state.settings, ...settings };
    dispatch({ type: "UPDATE_SETTINGS", payload: settings });
    await saveSettings(updated);
  };

  const value: ExpenseContextType = {
    ...state,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    updateCategory,
    deleteCategory,
    updateSettings,
    loadData,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense(): ExpenseContextType {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within ExpenseProvider");
  }
  return context;
}
