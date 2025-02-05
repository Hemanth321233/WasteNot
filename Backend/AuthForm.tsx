// src/components/AuthForm.tsx
import React from "react";
import { TextInput, TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface AuthFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  isLogin: boolean;
  handleAuth: () => void;
  switchAuthMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ email, setEmail, password, setPassword, loading, isLogin, handleAuth, switchAuthMode }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <FontAwesome name="envelope" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <FontAwesome name="lock" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <TouchableOpacity onPress={handleAuth} style={styles.authButton}>
          <Text style={styles.authButtonText}>{isLogin ? "Login" : "Sign Up"}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={switchAuthMode} style={styles.switchAuthButton}>
        <Text style={styles.switchAuthText}>
          {isLogin ? "Create an account" : "Already have an account? Log in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#4CAF50", // Add a background color for the container
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  authButton: {
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  authButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchAuthButton: {
    marginTop: 10,
  },
  switchAuthText: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default AuthForm;
