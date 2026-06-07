import React from "react";

import {
  View,
  Text,
} from "react-native";

export default function HeaderCustom({
  title,
}) {
  return (
    <View
      style={{
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor:
          "#2D6CDF",
      }}
    >
      <Text
        style={{
          color: "#FFF",
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
}