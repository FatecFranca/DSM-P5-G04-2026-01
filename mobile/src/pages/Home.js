import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  getUsersHealth,
} from "../services/authApi";

import {
  getMlHealth,
} from "../services/predictionApi";

import styles from "../styles";

export default function Home({
  navigation,
}) {
  const {
    user,
    signOut,
  } = useContext(
    AuthContext
  );

  const [
    apiStatus,
    setApiStatus,
  ] = useState(
    "Verificando..."
  );

  const [
    modelStatus,
    setModelStatus,
  ] = useState(
    "Verificando..."
  );

  async function handleLogout() {
    await signOut();

    navigation.replace(
      "Home"
    );
  }

  useEffect(() => {
    async function checkHealth() {
      try {
        await getUsersHealth();

        setApiStatus(
          "Online"
        );
      } catch {
        setApiStatus(
          "Offline"
        );
      }

      try {
        await getMlHealth();

        setModelStatus(
          "Ativo"
        );
      } catch {
        setModelStatus(
          "Indisponível"
        );
      }
    }

    checkHealth();
  }, []);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={
        styles.homeContainer
      }
    >
      {/* Header */}

      <View style={styles.header}>
        <View
          style={styles.brandRow}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />

          <Text
            style={
              styles.brandText
            }
          >
            Austim
          </Text>
        </View>
      </View>

      {/* Badge */}

      <View
        style={
          styles.welcomeBadge
        }
      >
        <Text
          style={
            styles.welcomeBadgeText
          }
        >
          Oi, bem-vindo(a)! 👋
        </Text>
      </View>

      {/* Hero */}

      <View
        style={styles.heroCard}
      >
        <Text
          style={
            styles.heroTitle
          }
        >
          Entender o espectro
          autista pode começar
          por aqui
        </Text>

        <Text
          style={
            styles.heroDescription
          }
        >
          O Austim é um projeto
          acadêmico desenvolvido
          para auxiliar na
          triagem informativa do
          Transtorno do Espectro
          Autista através do
          questionário AQ-10.
        </Text>

        <TouchableOpacity
          style={
            styles.primaryButton
          }
          onPress={() =>
            navigation.navigate(
              "Questionario"
            )
          }
        >
          <Text
            style={
              styles.primaryButtonText
            }
          >
            Começar
            Questionário
          </Text>
        </TouchableOpacity>

        {!user ? (
          <View
            style={
              styles.authButtonsRow
            }
          >
            <TouchableOpacity
              style={
                styles.outlineButton
              }
              onPress={() =>
                navigation.navigate(
                  "Login"
                )
              }
            >
              <Text
                style={
                  styles.outlineButtonText
                }
              >
                Entrar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.outlineButton
              }
              onPress={() =>
                navigation.navigate(
                  "Cadastro"
                )
              }
            >
              <Text
                style={
                  styles.outlineButtonText
                }
              >
                Criar Conta
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={
              styles.authButtonsRow
            }
          >
            <TouchableOpacity
              style={
                styles.outlineButton
              }
              onPress={
                handleLogout
              }
            >
              <Text
                style={
                  styles.outlineButtonText
                }
              >
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Como funciona */}

      <View style={styles.card}>
        <Text
          style={styles.cardIcon}
        >
          🧩
        </Text>

        <Text
          style={
            styles.cardTitle
          }
        >
          Como funciona?
        </Text>

        <Text
          style={
            styles.cardText
          }
        >
          Responda ao
          questionário AQ-10.
          Nosso modelo de
          aprendizado de
          máquina processa as
          respostas e gera uma
          análise informativa.
        </Text>
      </View>

      {/* Sobre */}

      <View style={styles.card}>
        <Text
          style={
            styles.cardTitle
          }
        >
          Sobre o Austim
        </Text>

        <Text
          style={
            styles.cardText
          }
        >
          Ferramenta de estudo
          baseada no
          questionário AQ-10.
          Não substitui
          consulta médica,
          diagnóstico ou
          acompanhamento
          profissional.
        </Text>
      </View>

      {/* Status */}

      <View
        style={
          styles.statusCard
        }
      >
        <Image
          source={require("../../assets/logo.png")}
          style={
            styles.statusLogo
          }
        />

        <Text
          style={
            styles.statusTitle
          }
        >
          Status do Sistema
        </Text>

        <View
          style={
            styles.statusRow
          }
        >
          <Text
            style={
              styles.statusLabel
            }
          >
            API Usuários
          </Text>

          <Text
            style={
              styles.statusValue
            }
          >
            {apiStatus}
          </Text>
        </View>

        <View
          style={
            styles.statusRow
          }
        >
          <Text
            style={
              styles.statusLabel
            }
          >
            Modelo IA
          </Text>

          <Text
            style={
              styles.statusValue
            }
          >
            {modelStatus}
          </Text>
        </View>

        <Text
          style={
            styles.statusNote
          }
        >
          Tudo isso é
          educativo — na
          dúvida, consulte um
          profissional de
          saúde.
        </Text>
      </View>

      {/* Disclaimer */}

      <View
        style={
          styles.disclaimer
        }
      >
        <Text
          style={
            styles.disclaimerText
          }
        >
          Austim • PI5 • feito
          para informar, não
          para diagnosticar.
        </Text>
      </View>
    </ScrollView>
  );
}