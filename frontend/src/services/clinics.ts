export type NearbyClinic = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  distanceKm: number;
  address?: string;
  mapsUrl: string;
};

export type ClinicsSearchResult = {
  source: "google" | "openstreetmap";
  clinics: NearbyClinic[];
  mapsSearchUrl: string;
};

type OverpassElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

function elementCoords(el: OverpassElement): { lat: number; lon: number } | null {
  if (el.lat != null && el.lon != null) return { lat: el.lat, lon: el.lon };
  if (el.center) return el.center;
  return null;
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;

  const toRad = (deg: number): number => deg * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function elementName(tags: Record<string, string> | undefined): string {
  if (!tags) return "Clínica / consultório";
  return (
    tags.name ||
    tags["healthcare:speciality"] ||
    tags.amenity ||
    "Serviço de saúde mental"
  );
}

/**
 * Busca clínicas e profissionais de saúde mental próximos via OpenStreetMap (gratuito).
 * A cobertura varia por região; em áreas com poucos dados, a lista pode vir vazia.
 */
export async function findNearbyMentalHealthClinics(
  lat: number,
  lon: number,
  radiusM = 10000,
): Promise<NearbyClinic[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["healthcare"~"psychiatrist|psychotherapist|psychology|counselling"](around:${radiusM},${lat},${lon});
      node["amenity"~"clinic|doctors|hospital"](around:${radiusM},${lat},${lon});
      way["amenity"~"clinic|hospital"](around:${radiusM},${lat},${lon});
      node["healthcare:speciality"~"psych|mental"](around:${radiusM},${lat},${lon});
    );
    out center 20;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) {
    throw new Error("Não foi possível buscar clínicas no mapa. Tente novamente.");
  }

  const data = (await response.json()) as { elements: OverpassElement[] };
  const seen = new Set<string>();
  const clinics: NearbyClinic[] = [];

  for (const el of data.elements ?? []) {
    const coords = elementCoords(el);
    if (!coords) continue;

    const name = elementName(el.tags);
    const key = `${el.type}-${el.id}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const distanceKm = haversineKm(lat, lon, coords.lat, coords.lon);
    const address = el.tags
      ? [el.tags["addr:street"], el.tags["addr:housenumber"], el.tags["addr:city"]]
          .filter(Boolean)
          .join(", ")
      : undefined;

    clinics.push({
      id: key,
      name,
      lat: coords.lat,
      lon: coords.lon,
      distanceKm,
      address: address || undefined,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lon}`,
    });
  }

  return clinics
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 8);
}

export function getGoogleMapsSearchUrl(lat: number, lon: number): string {
  return `https://www.google.com/maps/search/psiquiatra+clínica+saúde+mental/@${lat},${lon},14z`;
}

export function getUserPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Seu navegador não suporta localização."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 60000,
    });
  });
}
