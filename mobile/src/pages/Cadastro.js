import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import styles from "../styles";

import { maskPhone }
from "../utils/phoneMask";

import { createUser }
from "../services/authApi";

export default function Cadastro({
  navigation,
}) {
  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  async function handleCreate() {

    if (
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos"
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert(
        "Erro",
        "E-mail inválido"
      );
      return;
    }

    const phoneNumbers =
      phone.replace(/\D/g, "");

    if (phoneNumbers.length < 10) {
      Alert.alert(
        "Erro",
        "Telefone inválido"
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Erro",
        "Senha mínima de 6 caracteres"
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      Alert.alert(
        "Erro",
        "As senhas não coincidem"
      );
      return;
    }

    try {
      await createUser({
        email,
        phone,
        password,
      });

      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso"
      );

      navigation.goBack();

    } catch (error) {

      Alert.alert(
        "Erro",
        error?.response?.data?.message ||
        "Não foi possível criar a conta"
      );
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
            Criar Conta
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(v) =>
              setPhone(maskPhone(v))
            }
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

          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={
              setConfirmPassword
            }
          />

          <TouchableOpacity
            style={
              styles.buttonPrimary
            }
            onPress={
              handleCreate
            }
          >
            <Text
              style={
                styles.buttonText
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