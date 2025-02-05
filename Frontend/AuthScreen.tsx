// src/screens/AuthScreen.tsx
import React, { useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthForm from "../components/AuthForm";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../navigation/types"; // import RootStackParamList

const auth = getAuth();

// Define the type for navigation prop
type AuthScreenProps = NativeStackScreenProps<RootStackParamList, "Auth">;

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and Password are required!");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Logged in successfully");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Account created successfully");
      }
      navigation.replace("Home");
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let errorMessage = error.message || "Authentication failed";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const switchAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WasteNot</Text>
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        isLogin={isLogin}
        handleAuth={handleAuth}
        switchAuthMode={switchAuthMode}
      />
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
});

export default AuthScreen;
