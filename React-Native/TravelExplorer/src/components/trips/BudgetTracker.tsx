import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Budget, BudgetCategory, Trip } from "../../types/trip";
import { TripService } from "../../services/tripService";

interface BudgetTrackerProps {
  trip: Trip;
  onBudgetUpdate: (updatedTrip: Trip) => void;
  style?: any;
}

export default function BudgetTracker({
  trip,
  onBudgetUpdate,
  style,
}: BudgetTrackerProps) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<BudgetCategory | null>(null);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  const getTotalSpent = () => {
    return trip.budget.categories.reduce(
      (total, category) => total + category.spent,
      0
    );
  };

  const getTotalBudget = () => {
    return trip.budget.categories.reduce(
      (total, category) => total + category.budget,
      0
    );
  };

  const getBudgetProgress = () => {
    const totalBudget = getTotalBudget();
    if (totalBudget === 0) return 0;
    return (getTotalSpent() / totalBudget) * 100;
  };

  const handleAddExpense = async () => {
    if (!selectedCategory || !expenseAmount.trim()) {
      Alert.alert("Error", "Please select a category and enter an amount");
      return;
    }

    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    try {
      const updatedCategories = trip.budget.categories.map((category) => {
        if (category.id === selectedCategory.id) {
          return {
            ...category,
            spent: category.spent + amount,
          };
        }
        return category;
      });

      const updatedBudget: Budget = {
        ...trip.budget,
        categories: updatedCategories,
        spent: getTotalSpent() + amount,
        remaining: trip.budget.totalBudget - (getTotalSpent() + amount),
      };

      const updatedTrip: Trip = {
        ...trip,
        budget: updatedBudget,
      };

      await TripService.saveTrip(updatedTrip);
      onBudgetUpdate(updatedTrip);

      setExpenseAmount("");
      setExpenseDescription("");
      setSelectedCategory(null);
      setShowCategoryModal(false);
    } catch (error) {
      Alert.alert("Error", "Failed to add expense. Please try again.");
    }
  };

  const handleUpdateBudget = async (categoryId: string, newBudget: number) => {
    try {
      const updatedCategories = trip.budget.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            budget: newBudget,
          };
        }
        return category;
      });

      const totalBudget = updatedCategories.reduce(
        (total, category) => total + category.budget,
        0
      );
      const updatedBudget: Budget = {
        ...trip.budget,
        categories: updatedCategories,
        totalBudget,
        remaining: totalBudget - getTotalSpent(),
      };

      const updatedTrip: Trip = {
        ...trip,
        budget: updatedBudget,
      };

      await TripService.saveTrip(updatedTrip);
      onBudgetUpdate(updatedTrip);
    } catch (error) {
      Alert.alert("Error", "Failed to update budget. Please try again.");
    }
  };

  const getCategoryProgress = (category: BudgetCategory) => {
    if (category.budget === 0) return 0;
    return (category.spent / category.budget) * 100;
  };

  const getCategoryColor = (category: BudgetCategory) => {
    const progress = getCategoryProgress(category);
    if (progress > 100) return colors.error;
    if (progress > 80) return colors.warning;
    return category.color;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>💰 Budget Tracker</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCategoryModal(true)}
        >
          <Ionicons name="add" size={20} color={colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Overall Budget Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Budget</Text>
          <Text style={styles.summaryAmount}>
            {trip.budget.currency} {getTotalBudget().toLocaleString()}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Spent</Text>
          <Text style={styles.summaryAmount}>
            {trip.budget.currency} {getTotalSpent().toLocaleString()}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Remaining</Text>
          <Text
            style={[
              styles.summaryAmount,
              {
                color:
                  trip.budget.remaining >= 0 ? colors.success : colors.error,
              },
            ]}
          >
            {trip.budget.currency}{" "}
            {Math.abs(trip.budget.remaining).toLocaleString()}
          </Text>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(getBudgetProgress(), 100)}%`,
                backgroundColor:
                  getBudgetProgress() > 100 ? colors.error : colors.primary,
              },
            ]}
          />
        </View>
      </View>

      {/* Category Breakdown */}
      <ScrollView
        style={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
      >
        {trip.budget.categories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  Alert.prompt(
                    "Update Budget",
                    `Enter new budget for ${category.name}`,
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Update",
                        onPress: (text) => {
                          const newBudget = parseFloat(text || "0");
                          if (!isNaN(newBudget) && newBudget >= 0) {
                            handleUpdateBudget(category.id, newBudget);
                          }
                        },
                      },
                    ],
                    "plain-text",
                    category.budget.toString()
                  );
                }}
              >
                <Ionicons
                  name="create-outline"
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.categoryAmounts}>
              <Text style={styles.categorySpent}>
                {trip.budget.currency} {category.spent.toLocaleString()}
              </Text>
              <Text style={styles.categoryBudget}>
                / {trip.budget.currency} {category.budget.toLocaleString()}
              </Text>
            </View>

            <View style={styles.categoryProgressBar}>
              <View
                style={[
                  styles.categoryProgressFill,
                  {
                    width: `${Math.min(getCategoryProgress(category), 100)}%`,
                    backgroundColor: getCategoryColor(category),
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Expense Modal */}
      <Modal
        visible={showCategoryModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Expense</Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddExpense}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Select Category</Text>
              <View style={styles.categoriesGrid}>
                {trip.budget.categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryOption,
                      selectedCategory?.id === category.id &&
                        styles.categoryOptionSelected,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={styles.categoryOptionIcon}>
                      {category.icon}
                    </Text>
                    <Text style={styles.categoryOptionName}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Expense Details</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount *</Text>
                <TextInput
                  style={styles.input}
                  value={expenseAmount}
                  onChangeText={setExpenseAmount}
                  placeholder="0.00"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={expenseDescription}
                  onChangeText={setExpenseDescription}
                  placeholder="What did you spend on?"
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  numberOfLines={2}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  categoriesContainer: {
    maxHeight: 300,
  },
  categoryCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  editButton: {
    padding: 4,
  },
  categoryAmounts: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  categorySpent: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  categoryBudget: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  categoryProgressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  categoryProgressFill: {
    height: "100%",
    borderRadius: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalSection: {
    marginVertical: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryOption: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    minWidth: 80,
  },
  categoryOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  categoryOptionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryOptionName: {
    fontSize: 12,
    color: colors.text,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    height: 60,
    textAlignVertical: "top",
  },
});
