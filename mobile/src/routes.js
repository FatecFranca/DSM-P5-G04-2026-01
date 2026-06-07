import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Cadastro from "./pages/Cadastro";

import Clinicas from "./pages/Clinicas";

import Resultado from "./pages/Resultado";

import Questionario from "./pages/Questionario";

const Stack =
  createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />

        <Stack.Screen
          name="Questionario"
          component={
            Questionario
          }
        />

        <Stack.Screen
          name="Resultado"
          component={
            Resultado
          }
        />

        <Stack.Screen
          name="Clinicas"
          component={
            Clinicas
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}