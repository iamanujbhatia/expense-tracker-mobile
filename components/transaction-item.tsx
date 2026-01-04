/**
 * Transaction List Item Component
 */

import React from "react";
import { View, Text, Pressable } from "react-native";
import { Transaction, Category } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/calculations";
import { useColors } from "@/hooks/use-colors";

interface TransactionItemProps {
  transaction: Transaction;
  category?: Category;
  currency?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

export function TransactionItem({
  transaction,
  category,
  currency = "USD",
  onPress,
  onDelete,
}: TransactionItemProps) {
  const colors = useColors();
  const isIncome = transaction.type === "income";
  const amountColor = isIncome ? colors.success : colors.error;
  const amountSign = isIncome ? "+" : "−";

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-3 border-b border-border"
    >
      {/* Left: Category icon and info */}
      <View className="flex-row items-center flex-1 gap-3">
        <View
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{ backgroundColor: category?.color || "#6B7280" }}
        >
          <Text className="text-lg">{category?.icon || "📌"}</Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-foreground">{transaction.category}</Text>
          <Text className="text-xs text-muted mt-1">{formatDate(transaction.date)}</Text>
          {transaction.notes && (
            <Text className="text-xs text-muted mt-1 line-clamp-1">
              {transaction.notes}
            </Text>
          )}
        </View>
      </View>

      {/* Right: Amount */}
      <View className="items-end gap-2">
        <Text
          className="font-bold text-lg"
          style={{ color: amountColor }}
        >
          {amountSign}{formatCurrency(transaction.amount, currency)}
        </Text>
        {onDelete && (
          <Pressable
            onPress={onDelete}
            className="px-2 py-1"
          >
            <Text className="text-xs text-error font-semibold">Delete</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
