import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

export default function BottomNavCustom({
  navigation,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent:
          "space-around",
        padding: 15,
        borderTopWidth: 1,
        borderColor: "#DDD",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Home"
          )
        }
      >
        <Text>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Questionario"
          )
        }
      >
        <Text>
          Teste
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Clinicas"
          )
        }
      >
        <Text>
          Clínicas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Perfil"
          )
        }
      >
        <Text>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}