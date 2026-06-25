import {
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [listData, setListData] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTaskInList = () => {
    if (!inputValue.trim()) return;

    setListData((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: inputValue.trim(),
        taskStatus: "pending",
        createdAt: Date.now(),
      },
    ]);

    setInputValue("");
  };

  const saveTaskInList = () => {
    if (!inputValue.trim()) return;

    setListData((prev) =>
      prev.map((item) => {
        if (item.id === editingTaskId) {
          return {
            ...item,
            title: inputValue.trim(),
          };
        }
        return item;
      }),
    );

    setInputValue("");
    setEditingTaskId(null);
  };

  const deleteTask = (delId) => {
    setListData((prev) => prev.filter((task) => task.id !== delId));
  };

  const editTask = (editId) => {
    const task = listData.find((item) => item.id === editId);
    if (!task) return;

    setInputValue(task.title);
    setEditingTaskId(editId);
  };

  const renderTodoList = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.statusDot,
              item.taskStatus === "pending"
                ? styles.pendingDot
                : styles.doneDot,
            ]}
          />

          <Text style={styles.taskText}>{item.title}</Text>
        </View>

        <View style={styles.btnContainer}>
          <Pressable
            style={[styles.actionBtn, styles.editBtn]}
            onPress={() => editTask(item.id)}
          >
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>

          <Pressable
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={() => deleteTask(item.id)}
          >
            <Text style={styles.btnText}>Del</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>My Tasks</Text>

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a task..."
          placeholderTextColor="#999"
          value={inputValue}
          onChangeText={setInputValue}
        />

        <Pressable
          style={[styles.primaryBtn, editingTaskId && styles.saveBtn]}
          onPress={editingTaskId ? saveTaskInList : addTaskInList}
        >
          <Text style={styles.primaryBtnText}>
            {editingTaskId ? "Save" : "Add"}
          </Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTodoList}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F14",
    padding: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },

  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1A2230",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#2A3441",
  },

  primaryBtn: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F7CFF",
    borderRadius: 12,
  },

  saveBtn: {
    backgroundColor: "#22C55E",
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#121A26",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1F2A3A",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  taskText: {
    color: "#fff",
    fontSize: 15,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  pendingDot: {
    backgroundColor: "#F59E0B",
  },

  doneDot: {
    backgroundColor: "#22C55E",
  },

  btnContainer: {
    flexDirection: "row",
    gap: 8,
  },

  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  editBtn: {
    backgroundColor: "#3B82F6",
  },

  deleteBtn: {
    backgroundColor: "#EF4444",
  },

  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
