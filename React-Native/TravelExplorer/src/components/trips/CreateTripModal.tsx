import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Trip } from "../../types/trip";
import { TripService } from "../../services/tripService";

interface CreateTripModalProps {
  visible: boolean;
  onClose: () => void;
  onTripCreated: (trip: Trip) => void;
}

export default function CreateTripModal({
  visible,
  onClose,
  onTripCreated,
}: CreateTripModalProps) {
  const [tripName, setTripName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTrip = async () => {
    if (!tripName.trim()) {
      Alert.alert("Error", "Please enter a trip name");
      return;
    }

    if (!startDate || !endDate) {
      Alert.alert("Error", "Please select start and end dates");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      Alert.alert("Error", "End date must be after start date");
      return;
    }

    setIsLoading(true);

    try {
      const budgetAmount = budget ? parseFloat(budget) : 0;
      const defaultBudget = TripService.createDefaultBudget();
      defaultBudget.totalBudget = budgetAmount;
      defaultBudget.remaining = budgetAmount;
      defaultBudget.currency = currency;

      const newTrip = await TripService.createTrip({
        name: tripName.trim(),
        description: description.trim(),
        startDate,
        endDate,
        budget: defaultBudget,
      });

      onTripCreated(newTrip);
      resetForm();
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to create trip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTripName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setBudget("");
    setCurrency("USD");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getMinDate = () => {
    return formatDateForInput(new Date());
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    return formatDateForInput(maxDate);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Create New Trip</Text>
          <TouchableOpacity
            style={[
              styles.createButton,
              isLoading && styles.createButtonDisabled,
            ]}
            onPress={handleCreateTrip}
            disabled={isLoading}
          >
            <Text style={styles.createButtonText}>
              {isLoading ? "Creating..." : "Create"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trip Details</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Trip Name *</Text>
              <TextInput
                style={styles.input}
                value={tripName}
                onChangeText={setTripName}
                placeholder="Enter trip name"
                placeholderTextColor={colors.textSecondary}
                maxLength={50}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your trip..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={3}
                maxLength={200}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dates</Text>

            <View style={styles.dateRow}>
              <View style={styles.dateInputContainer}>
                <Text style={styles.inputLabel}>Start Date *</Text>
                <TextInput
                  style={styles.input}
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.dateInputContainer}>
                <Text style={styles.inputLabel}>End Date *</Text>
                <TextInput
                  style={styles.input}
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Budget</Text>

            <View style={styles.budgetRow}>
              <View style={styles.budgetInputContainer}>
                <Text style={styles.inputLabel}>Currency</Text>
                <View style={styles.currencyContainer}>
                  <Text style={styles.currencyText}>{currency}</Text>
                </View>
              </View>

              <View style={styles.budgetInputContainer}>
                <Text style={styles.inputLabel}>Total Budget</Text>
                <TextInput
                  style={styles.input}
                  value={budget}
                  onChangeText={setBudget}
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.budgetNote}>
              You can set a budget later or leave it empty for now
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Tips</Text>
            <View style={styles.tipsContainer}>
              <View style={styles.tipItem}>
                <Ionicons
                  name="bulb-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.tipText}>
                  You can add destinations and activities after creating the
                  trip
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.tipText}>
                  Set realistic dates to help with planning
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons
                  name="cash-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.tipText}>
                  Track your expenses as you plan and travel
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  createButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
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
    height: 80,
    textAlignVertical: "top",
  },
  dateRow: {
    flexDirection: "row",
    gap: 12,
  },
  dateInputContainer: {
    flex: 1,
  },
  budgetRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  budgetInputContainer: {
    flex: 1,
  },
  currencyContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  budgetNote: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});
