import { useState } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const takePhoto = async () => {
    setIsPending(true)
    setError(null)
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      })
      setPhoto(image.dataUrl ?? null)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const pickFromGallery = async () => {
    setIsPending(true)
    setError(null)
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      })
      setPhoto(image.dataUrl ?? null)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { photo, isPending, error, takePhoto, pickFromGallery }
}

export default useCamera