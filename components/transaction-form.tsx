/**
 * Transaction Form Component
 * Modal form for adding/editing transactions
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { Transaction, TransactionType, Category } from "@/lib/types";
import { getTodayString } from "@/lib/calculations";

interface TransactionFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, "id" | "createdAt">) => void;
  categories: Category[];
  initialData?: Transaction;
  defaultType?: TransactionType;
}

export function TransactionForm({
  visible,
  onClose,
  onSave,
  categories,
  initialData,
  defaultType = "expense",
}: TransactionFormProps) {
  const colors = useColors();
  const [type, setType] = useState<TransactionType>(initialData?.type || defaultType);
  const [amount, setAmount] = useState(initialData ? String(initialData.amount / 100) : "");
  const [category, setCategory] = useState(
    initialData?.category || categories[0]?.name || ""
  );
  const [date, setDate] = useState(initialData?.date || getTodayString());
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // Filter categories by type
  const filteredCategories = categories.filter(
    (c) => c.type === type || c.type === "both"
  );

  const handleSave = () => {
    if (!amount || !category) {
      alert("Please fill in all required fields");
      return;
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);
    onSave({
      type,
      amount: amountInCents,
      category,
      date,
      notes,
    });

    // Reset form
    setAmount("");
    setCategory(filteredCategories[0]?.name || "");
    setNotes("");
    setDate(getTodayString());
    onClose();
  };

  const selectedCategoryColor =
    categories.find((c) => c.name === category)?.color || "#6B7280";

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="flex-1 bg-black/50 justify-end">
        <View
          className="bg-background rounded-t-3xl p-6 max-h-[90%]"
          style={{ backgroundColor: colors.background }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-foreground">
                {initialData ? "Edit" : "Add"} Transaction
              </Text>
              <Pressable onPress={onClose}>
                <Text className="text-2xl text-muted">✕</Text>
              </Pressable>
            </View>

            {/* Type Toggle */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-muted mb-3">Type</Text>
              <View className="flex-row gap-3">
                {(["income", "expense"] as const).map((t) => (
                  <Pressable
                    key={t}
                    onPress={() => {
                      setType(t);
                      // Reset category when type changes
                      const newFiltered = categories.filter(
                        (c) => c.type === t || c.type === "both"
                      );
                      if (newFiltered.length > 0) {
                        setCategory(newFiltered[0].name);
                      }
                    }}
                    className={cn(
                      "flex-1 py-3 rounded-lg border-2 items-center",
                      type === t
                        ? t === "income"
                          ? "bg-success/10 border-success"
                          : "bg-error/10 border-error"
                        : "bg-surface border-border"
                    )}
                  >
                    <Text
                      className={cn(
                        "font-semibold",
                        type === t
                          ? t === "income"
                            ? "text-success"
                            : "text-error"
                          : "text-foreground"
                      )}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Amount */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-muted mb-2">Amount</Text>
              <View className="flex-row items-center bg-surface rounded-lg px-4 py-3 border border-border">
                <Text className="text-lg font-semibold text-foreground mr-2">$</Text>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor={colors.muted}
                  keyboardType="decimal-pad"
                  className="flex-1 text-lg font-semibold text-foreground"
                />
              </View>
            </View>

            {/* Category */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-muted mb-2">Category</Text>
              <Pressable
                onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                className="bg-surface rounded-lg px-4 py-3 border border-border flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedCategoryColor }}
                  />
                  <Text className="text-foreground font-medium">{category}</Text>
                </View>
                <Text className="text-muted">▼</Text>
              </Pressable>

              {/* Category Picker */}
              {showCategoryPicker && (
                <View className="bg-surface border border-border rounded-lg mt-2 p-2">
                  {filteredCategories.map((cat) => (
                    <Pressable
                      key={cat.id}
                      onPress={() => {
                        setCategory(cat.name);
                        setShowCategoryPicker(false);
                      }}
                      className="flex-row items-center gap-3 px-4 py-3 border-b border-border last:border-b-0"
                    >
                      <View
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <Text className="text-foreground flex-1">{cat.name}</Text>
                      {category === cat.name && (
                        <Text className="text-primary font-bold">✓</Text>
                      )}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Date */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-muted mb-2">Date</Text>
              <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.muted}
                className="bg-surface rounded-lg px-4 py-3 border border-border text-foreground font-medium"
              />
            </View>

            {/* Notes */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-muted mb-2">Notes (Optional)</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add a note..."
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={3}
                className="bg-surface rounded-lg px-4 py-3 border border-border text-foreground"
              />
            </View>

            {/* Buttons */}
            <View className="flex-row gap-3 mb-4">
              <Pressable
                onPress={onClose}
                className="flex-1 py-3 rounded-lg bg-surface border border-border items-center"
              >
                <Text className="font-semibold text-foreground">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSave}
                className="flex-1 py-3 rounded-lg items-center"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="font-semibold text-background">
                  {initialData ? "Update" : "Save"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
