/**
 * Monthly Summary Screen
 * Display financial statistics and category breakdown
 */

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { SummaryCard } from "@/components/summary-card";
import { useExpense } from "@/lib/expense-context";
import { useColors } from "@/hooks/use-colors";
import {
  getMonthString,
  calculateMonthlyStats,
  getMonthName,
  getPreviousMonth,
  getNextMonth,
  formatCurrency,
} from "@/lib/calculations";

export default function SummaryScreen() {
  const colors = useColors();
  const { transactions, categories, isLoading } = useExpense();
  const [currentMonth, setCurrentMonth] = useState(getMonthString());

  const stats = useMemo(
    () => calculateMonthlyStats(transactions, currentMonth),
    [transactions, currentMonth]
  );

  // Calculate category breakdown with percentages
  const categoryBreakdown = useMemo(() => {
    const breakdown = Object.entries(stats.byCategory)
      .map(([categoryName, amount]) => {
        const category = categories.find((c) => c.name === categoryName);
        const percentage =
          stats.totalExpenses > 0
            ? ((amount / stats.totalExpenses) * 100).toFixed(1)
            : "0";
        return {
          name: categoryName,
          amount,
          percentage: parseFloat(percentage),
          color: category?.color || "#6B7280",
          icon: category?.icon || "📌",
          type: category?.type || "expense",
        };
      })
      .sort((a, b) => b.amount - a.amount);

    return breakdown;
  }, [stats, categories]);

  // Separate income and expense categories
  const expenseCategories = categoryBreakdown.filter((c) => c.type !== "income");
  const incomeCategories = categoryBreakdown.filter((c) => c.type === "income");

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-background mb-4">Summary</Text>

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
        </View>

        {/* Summary Cards */}
        <View className="px-6 py-6 gap-3">
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

        {/* Expense Breakdown */}
        {expenseCategories.length > 0 && (
          <View className="px-6 pb-6">
            <Text className="text-lg font-bold text-foreground mb-4">Expense Breakdown</Text>

            {/* Simple Bar Chart */}
            <View className="bg-surface rounded-lg p-4 border border-border mb-4">
              {expenseCategories.map((cat) => (
                <View key={cat.name} className="mb-4 last:mb-0">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center gap-2 flex-1">
                      <Text className="text-lg">{cat.icon}</Text>
                      <Text className="text-sm font-semibold text-foreground flex-1">
                        {cat.name}
                      </Text>
                    </View>
                    <Text className="text-sm font-bold text-foreground">
                      {cat.percentage}%
                    </Text>
                  </View>
                  <View className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: cat.color,
                        width: `${cat.percentage}%`,
                      }}
                    />
                  </View>
                  <Text className="text-xs text-muted mt-1">
                    {formatCurrency(cat.amount)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Category List */}
            <View className="bg-surface rounded-lg overflow-hidden border border-border">
              {expenseCategories.map((cat, index) => (
                <View
                  key={cat.name}
                  className={`flex-row items-center justify-between px-4 py-3 ${
                    index !== expenseCategories.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <View
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <Text className="text-foreground font-medium flex-1">{cat.name}</Text>
                  </View>
                  <Text className="text-foreground font-bold">
                    {formatCurrency(cat.amount)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Income Breakdown */}
        {incomeCategories.length > 0 && (
          <View className="px-6 pb-6">
            <Text className="text-lg font-bold text-foreground mb-4">Income Breakdown</Text>

            <View className="bg-surface rounded-lg overflow-hidden border border-border">
              {incomeCategories.map((cat, index) => (
                <View
                  key={cat.name}
                  className={`flex-row items-center justify-between px-4 py-3 ${
                    index !== incomeCategories.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <View
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <Text className="text-foreground font-medium flex-1">{cat.name}</Text>
                  </View>
                  <Text className="text-success font-bold">
                    +{formatCurrency(cat.amount)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {expenseCategories.length === 0 && incomeCategories.length === 0 && (
          <View className="px-6 py-12 items-center">
            <Text className="text-muted text-center">
              No transactions for {getMonthName(currentMonth)}
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
