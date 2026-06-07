import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@autism:user";

export async function saveStoredUser(user) {
  await AsyncStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
}

export async function loadStoredUser() {
  const user = await AsyncStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

export async function clearStoredUser() {
  await AsyncStorage.removeItem(USER_KEY);
}