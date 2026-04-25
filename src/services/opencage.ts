const OPENCAGE_API_KEY = '5827d6a0ba1340818a25b9793dcad8fe'
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json'

export interface OpenCageResult {
  name: string
  formatted: string
  lat: number
  lng: number
  category: string
}

export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const res = await fetch(
      `${BASE_URL}?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}&language=es&limit=1`
    )
    const data = await res.json()
    if (data.results?.length > 0) {
      return data.results[0].formatted
    }
    return 'Dirección desconocida'
  } catch {
    return 'Error obteniendo dirección'
  }
}

export const getNearbyPlaces = async (lat: number, lng: number): Promise<OpenCageResult[]> => {
  try {
    const res = await fetch(
      `${BASE_URL}?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}&language=es&limit=10&no_annotations=1`
    )
    const data = await res.json()

    if (data.results?.length > 0) {
      return data.results.map((r: any) => ({
        name: r.components?.road ?? r.components?.neighbourhood ?? 'Lugar',
        formatted: r.formatted,
        lat: r.geometry.lat,
        lng: r.geometry.lng,
        category: r.components?._type ?? 'place',
      }))
    }
    return []
  } catch {
    return []
  }
}