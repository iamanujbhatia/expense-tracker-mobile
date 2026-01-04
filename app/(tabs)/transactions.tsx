/**
 * Transactions List Screen
 * View, filter, and manage all transactions
 */

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { TransactionItem } from "@/components/transaction-item";
import { TransactionForm } from "@/components/transaction-form";
import { useExpense } from "@/lib/expense-context";
import { useColors } from "@/hooks/use-colors";
import {
  sortTransactionsByDate,
  searchTransactions,
  filterByCategory,
  filterByType,
  getMonthString,
  getMonthName,
  getPreviousMonth,
  getNextMonth,
} from "@/lib/calculations";
import { Transaction } from "@/lib/types";

export default function TransactionsScreen() {
  const colors = useColors();
  const { transactions, categories, isLoading, deleteTransaction, updateTransaction } =
    useExpense();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all");
  const [currentMonth, setCurrentMonth] = useState(getMonthString());
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    let result = transactions.filter((t) => t.date.startsWith(currentMonth));

    if (searchQuery) {
      result = searchTransactions(result, searchQuery);
    }

    if (selectedCategory) {
      result = filterByCategory(result, selectedCategory);
    }

    if (selectedType !== "all") {
      result = filterByType(result, selectedType);
    }

    return sortTransactionsByDate(result);
  }, [transactions, searchQuery, selectedCategory, selectedType, currentMonth]);

  const handleDeleteTransaction = (id: string) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTransaction(id),
      },
    ]);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleSaveTransaction = async (
    data: Omit<Transaction, "id" | "createdAt">
  ) => {
    if (editingTransaction) {
      await updateTransaction({
        ...editingTransaction,
        ...data,
      });
      setEditingTransaction(null);
    }
    setShowForm(false);
  };

  const expenseCategories = categories.filter((c) => c.type === "expense" || c.type === "both");

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View className="bg-primary px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-background mb-4">Transactions</Text>

        {/* Month Navigation */}
        <View className="flex-row items-center justify-between mb-4">
          <Pressable onPress={() => setCurrentMonth(getPreviousMonth(currentMonth))}>
            <Text className="text-background font-semibold">← Prev</Text>
          </Pressable>
          <Text className="text-background font-semibold">{getMonthName(currentMonth)}</Text>
          <Pressable onPress={() => setCurrentMonth(getNextMonth(currentMonth))}>
            <Text className="text-background font-semibold">Next →</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-background/20 rounded-lg px-4 py-2 mb-4">
          <Text className="text-background/60 mr-2">🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search transactions..."
            placeholderTextColor={colors.background + "80"}
            className="flex-1 text-background"
          />
        </View>
      </View>

      {/* Filters */}
      <View className="px-6 py-4 gap-3">
        {/* Type Filter */}
        <View>
          <Text className="text-xs font-semibold text-muted mb-2">Type</Text>
          <View className="flex-row gap-2">
            {(["all", "income", "expense"] as const).map((type) => (
              <Pressable
                key={type}
                onPress={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full border ${
                  selectedType === type
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    selectedType === type ? "text-background" : "text-foreground"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Category Filter */}
        <View>
          <Text className="text-xs font-semibold text-muted mb-2">Category</Text>
          <View className="flex-row gap-2 flex-wrap">
            <Pressable
              onPress={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === null
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedCategory === null ? "text-background" : "text-foreground"
                }`}
              >
                All
              </Text>
            </Pressable>
            {expenseCategories.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === cat.name
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    selectedCategory === cat.name ? "text-background" : "text-foreground"
                  }`}
                >
                  {cat.icon} {cat.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Transaction List */}
      <View className="flex-1 px-6">
        {filteredTransactions.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-muted text-center">No transactions found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const category = categories.find((c) => c.name === item.category);
              return (
                <Pressable onPress={() => handleEditTransaction(item)}>
                  <TransactionItem
                    transaction={item}
                    category={category}
                    onDelete={() => handleDeleteTransaction(item.id)}
                  />
                </Pressable>
              );
            }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Edit Form Modal */}
      <TransactionForm
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        categories={categories}
        initialData={editingTransaction || undefined}
      />
    </ScreenContainer>
  );
}
