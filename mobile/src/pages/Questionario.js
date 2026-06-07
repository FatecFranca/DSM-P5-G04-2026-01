import React, { useState } from "react";

import {
  ScrollView,
  Text,
  TextInput,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { COUNTRIES } from "../constants/countries";
import styles from "../styles";

import {
  AQ_QUESTIONS,
  ETHNICITY_OPTIONS,
  RELATION_OPTIONS,
} from "../constants/questions";

import QuestionarioCard, {
  OptionGroupCard,
} from "../components/QuestionarioCard";

import { predict } from "../services/predictionApi";

export default function Questionario({ navigation }) {

  const [form, setForm] = useState({
    scores: Array(10).fill(null),

    age: "25",
    gender: "m",
    ethnicity: "White-European",

    jundice: "no",
    austim: "no",
    usedAppBefore: "no",

    relation: "Self",
    country: "Brazil",
  });

  // 🔹 Atualiza respostas do AQ-10
  function updateScore(index, value) {
    const updated = [...form.scores];
    updated[index] = value;

    setForm({ ...form, scores: updated });
  }

  // 🔹 Atualiza campos simples
  function updateField(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function handleSubmit() {
    const ageNum = parseInt(form.age);

    if (isNaN(ageNum) || ageNum < 1) {
      Alert.alert("Erro", "Informe uma idade válida.");
      return;
    }

    if (form.scores.includes(null)) {
      Alert.alert("Erro", "Responda todas as questões.");
      return;
    }

    try {
      const payload = {
        A1_Score: form.scores[0],
        A2_Score: form.scores[1],
        A3_Score: form.scores[2],
        A4_Score: form.scores[3],
        A5_Score: form.scores[4],
        A6_Score: form.scores[5],
        A7_Score: form.scores[6],
        A8_Score: form.scores[7],
        A9_Score: form.scores[8],
        A10_Score: form.scores[9],

        age: ageNum,
        gender: form.gender,
        ethnicity: form.ethnicity,
        jundice: form.jundice,
        austim: form.austim,

        contry_of_res: form.country,
        used_app_before: form.usedAppBefore,
        age_desc: "18 and more",
        relation: form.relation,
      };

      const result = await predict(payload);

      navigation.navigate("Resultado", { result });
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao processar questionário.");
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContainer}
    >
      <Text style={styles.title}>Questionário AQ-10</Text>

      <Text style={styles.subtitle}>
        Responda todas as perguntas para gerar uma análise preliminar.
      </Text>

      {/* 🔹 AQ-10 */}
      {AQ_QUESTIONS.map((q, i) => (
        <QuestionarioCard
          key={i}
          question={`${i + 1}. ${q}`}
          value={form.scores[i]}
          onChange={(v) => updateScore(i, v)}
        />
      ))}

      {/* 🔹 Idade */}
      <Text style={styles.label}>Idade</Text>
      <TextInput
        style={styles.input}
        value={form.age}
        keyboardType="numeric"
        onChangeText={(v) => updateField("age", v)}
      />

      {/* 🔹 Gênero */}
      <OptionGroupCard
        label="Gênero"
        value={form.gender}
        onChange={(v) => updateField("gender", v)}
        options={[
          { label: "Masculino", value: "m" },
          { label: "Feminino", value: "f" },
        ]}
      />

      {/* 🔹 Etnia */}
      <OptionGroupCard
        label="Etnia"
        value={form.ethnicity}
        onChange={(v) => updateField("ethnicity", v)}
        options={ETHNICITY_OPTIONS}
      />

      {/* 🔹 País */}
      <Text style={styles.label}>País</Text>
      <View
        style={{
          borderWidth: 2,
          borderColor: "#FFEAA7",
          borderRadius: 14,
          backgroundColor: "#FFF",
          marginBottom: 15,
        }}
      >
        <Picker
          selectedValue={form.country}
          onValueChange={(v) => updateField("country", v)}
        >
          {COUNTRIES.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      {/* 🔹 Relação */}
      <OptionGroupCard
        label="Quem está respondendo?"
        value={form.relation}
        onChange={(v) => updateField("relation", v)}
        options={RELATION_OPTIONS}
      />

      {/* 🔹 Yes / No */}
      <YesNo
        title="Teve icterícia quando bebê?"
        value={form.jundice}
        onChange={(v) => updateField("jundice", v)}
      />

      <YesNo
        title="Histórico de autismo na família?"
        value={form.austim}
        onChange={(v) => updateField("austim", v)}
      />

      <YesNo
        title="Já utilizou outro app de triagem?"
        value={form.usedAppBefore}
        onChange={(v) => updateField("usedAppBefore", v)}
      />

      {/* 🔹 Botão */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ver Resultado</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function YesNo({ title, value, onChange }) {
  return (
    <>
      <Text style={styles.label}>{title}</Text>

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
        <TouchableOpacity
          onPress={() => onChange("yes")}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: value === "yes" ? "#4A90D9" : "#FFEAA7",
            backgroundColor: value === "yes" ? "#EAF4FF" : "#FFF",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Sim</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChange("no")}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: value === "no" ? "#4A90D9" : "#FFEAA7",
            backgroundColor: value === "no" ? "#EAF4FF" : "#FFF",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Não</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}