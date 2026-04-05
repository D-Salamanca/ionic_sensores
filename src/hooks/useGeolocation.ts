import { useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'

const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentPosition = async () => {
    setIsPending(true)
    setError(null)
    try {
      const pos = await Geolocation.getCurrentPosition()
      setPosition(pos)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const watchPosition = async () => {
    setError(null)
    try {
      await Geolocation.watchPosition({}, (pos, err) => {
        if (err) {
          setError(err.message)
          return
        }
        setPosition(pos)
      })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return { position, isPending, error, getCurrentPosition, watchPosition }
}

export default useGeolocation