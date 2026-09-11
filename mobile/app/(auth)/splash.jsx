import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafeInspect</Text>
      <Text style={styles.subtitle}>Property Inspection Made Simple</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});