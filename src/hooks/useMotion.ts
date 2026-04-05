import { useState, useEffect } from 'react'
import { Motion } from '@capacitor/motion'

const useMotion = () => {
  const [accel, setAccel] = useState<any>(null)
  const [orientation, setOrientation] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let accelListener: any
    let orientationListener: any

    const startListening = async () => {
      try {
        accelListener = await Motion.addListener('accel', (event) => {
          setAccel(event.acceleration)
        })

        orientationListener = await Motion.addListener('orientation', (event) => {
          setOrientation(event)
        })
      } catch (err: any) {
        setError(err.message)
      }
    }

    startListening()

    return () => {
      accelListener?.remove()
      orientationListener?.remove()
    }
  }, [])

  return { accel, orientation, error }
}

export default useMotion