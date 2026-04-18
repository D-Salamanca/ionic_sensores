import { useState } from 'react'
import { reverseGeocode, getNearbyPlaces, type OpenCageResult } from '../services/opencage'

const useOpenCage = () => {
  const [address, setAddress] = useState<string | null>(null)
  const [nearbyPlaces, setNearbyPlaces] = useState<OpenCageResult[]>([])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAddress = async (lat: number, lng: number) => {
    setIsPending(true)
    setError(null)
    try {
      const result = await reverseGeocode(lat, lng)
      setAddress(result)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const getPlaces = async (lat: number, lng: number) => {
    setIsPending(true)
    setError(null)
    try {
      const results = await getNearbyPlaces(lat, lng)
      setNearbyPlaces(results)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { address, nearbyPlaces, isPending, error, getAddress, getPlaces }
}

export default useOpenCage