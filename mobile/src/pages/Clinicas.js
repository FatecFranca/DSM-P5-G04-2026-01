import React, {
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";

import styles from "../styles";

import {
  getUserPosition,
  getGoogleMapsSearchUrl,
} from "../services/clinics";

export default function Clinicas() {
  const [loading, setLoading] =
    useState(false);

  const [mapsUrl, setMapsUrl] =
    useState(null);

  async function buscar() {
    try {
      setLoading(true);

      const position =
        await getUserPosition();

      const lat =
        position.coords.latitude;

      const lon =
        position.coords.longitude;

      const url =
        getGoogleMapsSearchUrl(
          lat,
          lon
        );

      setMapsUrl(url);
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={
        styles.scrollContainer
      }
    >
      <Text style={styles.title}>
        Clínicas Próximas
      </Text>

      <Text style={styles.subtitle}>
        Utilize sua localização para
        encontrar psiquiatras,
        psicólogos e clínicas de
        saúde mental próximas.
      </Text>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={buscar}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Buscando..."
            : "Usar Minha Localização"}
        </Text>
      </TouchableOpacity>

      <View style={styles.clinicCard}>
        <Text style={styles.clinicIcon}>
          📍
        </Text>

        <Text style={styles.clinicTitle}>
          Busca Inteligente
        </Text>

        <Text
          style={
            styles.clinicDescription
          }
        >
          Utilizamos sua localização
          atual para abrir uma busca
          automática por clínicas,
          psicólogos e psiquiatras
          próximos de você.
        </Text>

        {mapsUrl && (
          <TouchableOpacity
            style={styles.mapsButton}
            onPress={() =>
              Linking.openURL(
                mapsUrl
              )
            }
          >
            <Text
              style={
                styles.mapsButtonText
              }
            >
              Abrir no Google Maps
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}