import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export function OptionButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: selected ? "#4A90D9" : "#FFEAA7",
        backgroundColor: selected ? "#EAF4FF" : "#FFF",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "700", color: "#2d3436" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* 🔹 CARD BASE (QUESTÕES AQ-10) */
export default function QuestionarioCard({
  question,
  value,
  onChange,
}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#ffeaa7",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: "#2d3436",
          marginBottom: 12,
        }}
      >
        {question}
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <OptionButton
          label="Sim"
          selected={value === 1}
          onPress={() => onChange(1)}
        />

        <OptionButton
          label="Não"
          selected={value === 0}
          onPress={() => onChange(0)}
        />
      </View>
    </View>
  );
}

/* 🔹 CARD GENÉRICO (GÊNERO / ETNIA / RELAÇÃO) */
export function OptionGroupCard({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <View
      style={{
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8,
          color: "#2d3436",
        }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {options.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => onChange(item.value)}
            style={{
              flex: 1,
              minWidth: "45%",
              paddingVertical: 10,
              borderRadius: 999,
              borderWidth: 2,
              borderColor:
                value === item.value
                  ? "#4A90D9"
                  : "#FFEAA7",
              backgroundColor:
                value === item.value
                  ? "#EAF4FF"
                  : "#FFF",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700" }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}