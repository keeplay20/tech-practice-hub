import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback, useMemo, useEffect } from "react";

const generate1000Tasks = () => {
  return Array.from({ length: 1000 }, (_, index) => {
    const id = index + 1;
    return {
      id: `task-${id}`,
      title: `Task Title Number ${id}`,
      status: Math.random() > 0.5 ? "Pending" : "Completed",
    };
  });
};

export const statusChips = ["All", "Pending", "Completed"];

// 1. Memoized Task Row Component (Theme responsive)
const TaskRow = React.memo(
  ({ item, isDarkMode }) => {
    const isCompleted = item.status === "Completed";

    return (
      <View style={[styles.listContainer, isDarkMode && styles.darkCard]}>
        <Text style={[styles.titleText, isDarkMode && styles.darkText]}>
          {item.title}
        </Text>
        <View
          style={[
            styles.badge,
            isCompleted ? styles.completedBadge : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isCompleted ? styles.completedText : styles.pendingText,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Re-render only if status OR theme changes
    return (
      prevProps.item.status === nextProps.item.status &&
      prevProps.isDarkMode === nextProps.isDarkMode
    );
  },
);

export const TaskListComponent = () => {
  const [generatedTask, setGeneratedTask] = useState(() => generate1000Tasks());
  const [selectedChip, setSelectedChip] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false); // 🔥 Theme State
  const [searchInput, setSearchInput] = useState("");
  const [debounceValue, setDebounceValue] = useState(searchInput);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searchInput);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const filteredTasksData = useMemo(() => {
    let result = generatedTask;
    if (selectedChip !== "All") {
      result = result.filter((task) => task.status === selectedChip);
    }

    if (debounceValue.trim() !== "") {
      result = result.filter((text) =>
        text.title
          .toLowerCase()
          .trim()
          .includes(debounceValue.trim().toLowerCase()),
      );
    }

    const sortedData = [...result];

    sortedData.sort((a, b) => {
      const numA = parseInt(a.title.split(" ").pop());

      const numB = parseInt(b.title.split(" ").pop());

      if (sortOrder === "asc") {
        return numA - numB;
      }

      return numB - numA;
    });

    result = sortedData;

    return result;
  }, [selectedChip, generatedTask, debounceValue, sortOrder]);

  useEffect(() => {
    const handler = setInterval(() => {
      setGeneratedTask((prevTasks) => {
        const pendingIndices = [];
        prevTasks.forEach((task, index) => {
          if (task.status === "Pending") {
            pendingIndices.push(index);
          }
        });

        if (pendingIndices.length === 0) {
          return prevTasks;
        }

        const randomPendingIndex =
          pendingIndices[Math.floor(Math.random() * pendingIndices.length)];

        const updatedTasks = [...prevTasks];
        updatedTasks[randomPendingIndex] = {
          ...updatedTasks[randomPendingIndex],
          status: "Completed",
        };

        return updatedTasks;
      });
    }, 2000);

    return () => clearInterval(handler);
  }, []);

  const renderTaskList = useCallback(
    ({ item }) => {
      return <TaskRow item={item} isDarkMode={isDarkMode} />;
    },
    [isDarkMode],
  ); // 💡 Added isDarkMode dependency here

  const filterTasks = useCallback((statusChip) => {
    setSelectedChip(statusChip);
  }, []);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, isDarkMode && styles.darkContainer]}
    >
      {/* 👑 HEADER WITH THEME TOGGLE BUTTON */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>
          Jio Tasks
        </Text>
        <Pressable
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={[styles.themeButton, isDarkMode && styles.darkThemeButton]}
        >
          <Text style={styles.themeButtonText}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </Pressable>
      </View>

      <TextInput
        placeholder={"Search Task"}
        style={styles.textInput}
        value={searchInput}
        placeholderTextColor={isDarkMode ? "white" : "#999"}
        onChangeText={(text) => setSearchInput(text)}
      ></TextInput>

      {/* CHIPS */}
      <View style={styles.chipContainer}>
        {statusChips.map((statusChip) => {
          const isActive = statusChip === selectedChip;
          return (
            <Pressable
              key={statusChip}
              onPress={() => filterTasks(statusChip)}
              style={[
                styles.chip,
                isDarkMode && styles.darkChip,
                isActive && styles.activeChip,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  isDarkMode && styles.darkText,
                  isActive && styles.activeChipText,
                ]}
              >
                {statusChip}
              </Text>
            </Pressable>
          );
        })}
        <Pressable onPress={handleSort} style={styles.chip}>
          <Text>{`Sort ${sortOrder}`}</Text>
        </Pressable>
      </View>

      {/* FLATLIST */}
      <FlatList
        data={filteredTasksData}
        renderItem={renderTaskList}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#F8F9FA",
  },
  darkContainer: {
    backgroundColor: "#121212", // Clean Premium Dark background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212529",
  },
  themeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  darkThemeButton: {
    backgroundColor: "#333333",
  },
  themeButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#212529",
    color: "#555",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: "#1E1E1E",
    shadowColor: "#000",
    elevation: 0, // Dark mode mein shadow avoid karte hain
  },
  titleText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#212529",
  },
  darkText: {
    color: "#FFFFFF",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  completedBadge: {
    backgroundColor: "#E8F5E9",
  },
  completedText: {
    color: "#2E7D32",
  },
  pendingBadge: {
    backgroundColor: "#FFF3E0",
  },
  pendingText: {
    color: "#EF6C00",
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  darkChip: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333333",
  },
  activeChip: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  statusText: {
    fontSize: 14,
    color: "#495057",
    fontWeight: "500",
  },
  activeChipText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 10,
  },
});
