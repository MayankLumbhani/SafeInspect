import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { getAuthSession } from "../../src/utils/authSession";

export default function SplashScreen() {
useEffect(() => {
  const checkSession = async () => {
    const session = await getAuthSession();

    if (session) {
      console.log("Existing session found");
      console.log("User:", session.user);

      // Dashboard will be added later.
      router.replace("/home");
      return;
    }

    router.replace("/(auth)/login");
  };

  checkSession();
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