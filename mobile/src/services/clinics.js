import * as Location
from "expo-location";

export async function
getUserPosition() {

  const permission =
    await Location.requestForegroundPermissionsAsync();

  if (
    permission.status !==
    "granted"
  ) {
    throw new Error(
      "Permissão negada"
    );
  }

  return await Location.getCurrentPositionAsync(
    {}
  );
}

export function
getGoogleMapsSearchUrl(
  lat,
  lon
) {
  return `https://www.google.com/maps/search/psiquiatra+clínica+saúde+mental/@${lat},${lon},14z`;
}