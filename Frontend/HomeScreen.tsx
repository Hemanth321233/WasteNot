// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack"; // Import this
import { RootStackParamList } from "../navigation/types"; // Import RootStackParamList

const auth = getAuth();

// Define the type for the navigation prop
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Auth");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Logout failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WasteNot!</Text>
      {user ? (
        <Text style={styles.subText}>Logged in as: {user.email}</Text>
      ) : (
        <Text style={styles.subText}>Not logged in</Text>
      )}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#4CAF50",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  subText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default HomeScreen;
