import React from "react";

import {
  View,
  Text,
} from "react-native";

import styles from "../styles";

export default function ResultadoCard({
  yesPercent,
  noPercent,
}) {
  return (
    <View
      style={
        styles.resultCard
      }
    >
      <Text
        style={
          styles.resultLabel
        }
      >
        Probabilidade de TEA
      </Text>

      <Text
        style={
          styles.resultPercent
        }
      >
        {yesPercent}%
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text>
          Possível TEA:
          {" "}
          {yesPercent}%
        </Text>

        <View
          style={{
            height: 12,
            backgroundColor:
              "#eee",
            borderRadius: 999,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              height: 12,
              width: `${yesPercent}%`,
              backgroundColor:
                "#58d68d",
              borderRadius: 999,
            }}
          />
        </View>

        <Text>
          Sem indícios:
          {" "}
          {noPercent}%
        </Text>

        <View
          style={{
            height: 12,
            backgroundColor:
              "#eee",
            borderRadius: 999,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              height: 12,
              width: `${noPercent}%`,
              backgroundColor:
                "#f5d547",
              borderRadius: 999,
            }}
          />
        </View>
      </View>
    </View>
  );
}