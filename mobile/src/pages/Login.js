import React, {
  useState,
  useContext,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import styles from "../styles";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  loginUser,
} from "../services/authApi";

export default function Login({
  navigation,
}) {
  const { signIn } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const user =
        await loginUser({
          email,
          password,
        });

      await signIn(user);

      navigation.replace(
        "Home"
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message ||
          "Falha ao entrar"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={
          styles.scrollContainer
        }
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            Entrar
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={
              setPassword
            }
          />

          <TouchableOpacity
            style={
              styles.buttonPrimary
            }
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={
                  styles.buttonText
                }
              >
                Entrar
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.buttonOutline
            }
            onPress={() =>
              navigation.navigate(
                "Cadastro"
              )
            }
          >
            <Text
              style={
                styles.buttonOutlineText
              }
            >
              Criar Conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}