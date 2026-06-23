import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { useCallback, useState, useMemo, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const chats = [
  {
    id: "1",
    name: "John",
    message: "Hey, how are you?",
    time: "10:30 AM",
    unread: 21,
    online: true,
    isPinned: true,
  },
  {
    id: "2",
    name: "Sarah",
    message: "Meeting at 5?",
    time: "9:45 AM",
    unread: 0,
    online: false,
    isPinned: false,
  },
  {
    id: "3",
    name: "Mike",
    message: "Movie tonight?",
    time: "Yesterday",
    unread: 5,
    online: true,
    isPinned: true,
  },
];

export function WhatsAppChatList() {
  const [selectChat, setSelectChat] = useState(null);
  const [chatsState, setChatsState] = useState(chats);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    // 1. Jaise hi user ne type kiya, humne 500ms ka naya timer lagaya
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery); // Ye tabhi chalega jab user 500ms tak ruka rahega
      console.log("API CALLING WITH:", searchQuery);
    }, 500);

    // 2. CLEANUP FUNCTION (Kamal ki cheez):
    // Agar user ne agla letter 500ms se pehle daba diya, toh ye function purane timer ko kill kar dega
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const selectChatItem = useCallback((id) => {
    setSelectChat(id);
  }, []);

  // DOUBT 1 FIX: id receive ki, return lagaya, aur ...cht use kiya
  const togglePinChat = useCallback((id) => {
    setChatsState((prevChats) =>
      prevChats.map((cht) =>
        cht.id === id ? { ...cht, isPinned: !cht.isPinned } : cht,
      ),
    );
  }, []);

  // DOUBT 2 FIX: chatsState ko use kiya aur unread ke sath 'return' lagaya
  const sortedChats = useMemo(() => {
    return [...chatsState].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.unread - a.unread; // return miss tha  yahan
    });
  }, [chatsState]);

  // DOUBT 3 FIX: { item } use kiya destructuring ke liye, ab item.item nahi karna padega
  const displayChats = useCallback(
    ({ item }) => {
      const isSelected = selectChat === item.id;
      const chatColor = isSelected ? "#ffe6e6" : "white";

      return (
        <Pressable
          style={[styles.msgContainer, { backgroundColor: chatColor }]}
          onPress={() => selectChatItem(item.id)}
        >
          <View style={styles.firstRow}>
            <View style={styles.nameOnlineRow}>
              {/* Pinned chat ke aage icon dikhane ke liye */}
              <Text style={styles.userName}>
                {item.name} {item.isPinned ? "📌" : ""}
              </Text>
              {item.online && <View style={styles.onlineCircle}></View>}
            </View>
            <Text style={styles.genericText}>{item.time}</Text>
          </View>
          <View style={styles.firstRow}>
            <Text>{item.message}</Text>
            <View style={styles.pinBadgeGrp}>
              <Pressable
                style={styles.pinButton}
                onPress={() => togglePinChat(item.id)} // direct ID bheji
              >
                <Text style={{ fontSize: 12 }}>
                  {item.isPinned ? "Unpin" : "Pin"}
                </Text>
              </Pressable>
              {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {item.unread}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      );
    },
    [selectChat, selectChatItem, togglePinChat],
  );

  const Header = useCallback(
    () => <Text style={styles.headerText}>Chat List</Text>,
    [],
  );
  const EmptyContainer = useCallback(
    () => <Text>There are no messages</Text>,
    [],
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <TextInput
        value={searchQuery}
        style={styles.textInput}
        placeholder={"Search chat"}
        onChangeText={setSearchQuery}
      ></TextInput>
      <Text style={styles.text}>{debounceQuery}</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        extraData={selectChat}
        data={sortedChats}
        renderItem={displayChats}
        // ListHeaderComponent={Header}
        ListEmptyComponent={EmptyContainer}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  msgContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgrey",
    marginBottom: 15,
  },
  firstRow: {
    justifyContent: "space-between",
    gap: 10,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  onlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
  unreadBadge: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "orange",
  },
  nameOnlineRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  userName: { fontSize: 16, fontWeight: "bold" },
  genericText: { fontSize: 14 },
  headerText: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  pinButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  pinBadgeGrp: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "lightgrey",
  },
});
