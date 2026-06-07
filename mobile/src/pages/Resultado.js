import React from "react";

import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "../styles";

import ResultadoCard from "../components/ResultadoCard";

export default function Resultado({
  route,
  navigation,
}) {
  const { result } =
    route.params;

  const yesPercent =
    Math.round(
      result
        .probabilities
        .YES * 100
    );

  const noPercent =
    Math.round(
      result
        .probabilities
        .NO * 100
    );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={
        styles.scrollContainer
      }
    >
      <Text style={styles.title}>
        Seu Resultado
      </Text>

      <ResultadoCard
        yesPercent={
          yesPercent
        }
        noPercent={
          noPercent
        }
      />

      <Text
        style={styles.subtitle}
      >
        {result.message}
      </Text>

      <View style={styles.card}>
        <Text
          style={styles.cardTitle}
        >
          Próximo Passo
        </Text>

        <Text
          style={styles.cardText}
        >
          Caso deseje um
          acompanhamento
          profissional, você pode
          procurar psicólogos,
          psiquiatras ou clínicas
          especializadas próximas
          da sua localização.
        </Text>

        <TouchableOpacity
          style={
            styles.buttonSecondary
          }
          onPress={() =>
            navigation.navigate(
              "Clinicas"
            )
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Buscar Clínicas
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={
          styles.buttonPrimary
        }
        onPress={() =>
          navigation.replace(
            "Questionario"
          )
        }
      >
        <Text
          style={
            styles.buttonText
          }
        >
          Fazer Novamente
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          styles.buttonOutline
        }
        onPress={() =>
          navigation.navigate(
            "Home"
          )
        }
      >
        <Text
          style={
            styles.buttonOutlineText
          }
        >
          Voltar ao Início
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}