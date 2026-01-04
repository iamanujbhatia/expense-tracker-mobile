/**
 * Home / Dashboard Screen
 * Overview of current month's balance and recent transactions
 */

import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { SummaryCard } from "@/components/summary-card";
import { TransactionItem } from "@/components/transaction-item";
import { TransactionForm } from "@/components/transaction-form";
import { useExpense } from "@/lib/expense-context";
import { useColors } from "@/hooks/use-colors";
import {
  getMonthString,
  calculateMonthlyStats,
  getRecentTransactions,
  getTodayString,
} from "@/lib/calculations";
import { Transaction } from "@/lib/types";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { transactions, categories, isLoading, addTransaction } = useExpense();
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"income" | "expense">("expense");

  const currentMonth = getMonthString();
  const stats = calculateMonthlyStats(transactions, currentMonth);
  const recentTransactions = getRecentTransactions(transactions, 5);

  const handleAddTransaction = async (data: Omit<Transaction, "id" | "createdAt">) => {
    const transaction: Transaction = {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: Date.now(),
    };
    await addTransaction(transaction);
    setShowForm(false);
  };

  const openAddForm = (type: "income" | "expense") => {
    setFormType(type);
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View className="bg-primary px-6 pt-6 pb-8">
          <Text className="text-sm font-semibold text-background/80 mb-2">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text className="text-3xl font-bold text-background mb-6">Dashboard</Text>

          {/* Summary Cards */}
          <View className="gap-3">
            <SummaryCard
              title="Total Income"
              amount={stats.totalIncome}
              type="income"
            />
            <SummaryCard
              title="Total Expenses"
              amount={stats.totalExpenses}
              type="expense"
            />
            <SummaryCard
              title="Net Balance"
              amount={stats.netBalance}
              type="balance"
            />
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View className="flex-row gap-3 px-6 py-6">
          <Pressable
            onPress={() => openAddForm("income")}
            className="flex-1 bg-success/10 rounded-lg py-3 items-center border border-success"
          >
            <Text className="text-success font-semibold">+ Income</Text>
          </Pressable>
          <Pressable
            onPress={() => openAddForm("expense")}
            className="flex-1 bg-error/10 rounded-lg py-3 items-center border border-error"
          >
            <Text className="text-error font-semibold">+ Expense</Text>
          </Pressable>
        </View>

        {/* Recent Transactions */}
        <View className="px-6 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-foreground">Recent Transactions</Text>
            <Pressable onPress={() => router.navigate("transactions" as any)}>
              <Text className="text-primary font-semibold">View All</Text>
            </Pressable>
          </View>

          {recentTransactions.length === 0 ? (
            <View className="bg-surface rounded-lg p-6 items-center">
              <Text className="text-muted text-center">
                No transactions yet. Start by adding your first income or expense!
              </Text>
            </View>
          ) : (
            <View className="bg-surface rounded-lg overflow-hidden border border-border">
              {recentTransactions.map((transaction) => {
                const category = categories.find((c) => c.name === transaction.category);
                return (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    category={category}
                  />
                );
              })}
            </View>
          )}
        </View>

        {/* Summary Link */}
        <View className="px-6 pb-6">
          <Pressable
            onPress={() => router.navigate("summary" as any)}
            className="bg-primary/10 rounded-lg py-4 items-center border border-primary"
          >
            <Text className="text-primary font-semibold">View Monthly Summary</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Transaction Form Modal */}
      <TransactionForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleAddTransaction}
        categories={categories}
        defaultType={formType}
      />
    </ScreenContainer>
  );
}
