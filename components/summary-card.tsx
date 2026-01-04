/**
 * Summary Card Component
 * Displays financial statistics
 */

import React from "react";
import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { formatCurrency } from "@/lib/calculations";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  amount: number;
  currency?: string;
  type?: "income" | "expense" | "balance";
  className?: string;
}

export function SummaryCard({
  title,
  amount,
  currency = "USD",
  type = "balance",
  className,
}: SummaryCardProps) {
  const colors = useColors();

  let backgroundColor = colors.surface;
  let textColor = colors.foreground;

  if (type === "income") {
    backgroundColor = "#22C55E20"; // success with opacity
    textColor = colors.success;
  } else if (type === "expense") {
    backgroundColor = "#EF444420"; // error with opacity
    textColor = colors.error;
  }

  return (
    <View
      className={cn("rounded-2xl p-4", className)}
      style={{ backgroundColor }}
    >
      <Text className="text-sm font-semibold text-muted mb-2">{title}</Text>
      <Text
        className="text-2xl font-bold"
        style={{ color: textColor }}
      >
        {formatCurrency(amount, currency)}
      </Text>
    </View>
  );
}
