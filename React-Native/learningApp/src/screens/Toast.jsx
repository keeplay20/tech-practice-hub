const Toast = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = toastEventEmitter.on("SHOW TOAST", (duration) => {
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, duration);
    });

    return unsubscribe;
  }, []);

  if (!visible) return null;

  return (
    <View style={toastStyles.container}>
      <Text>Toast Shown!</Text>
    </View>
  );
};

const toastStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
