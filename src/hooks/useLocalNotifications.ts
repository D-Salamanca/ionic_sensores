import { useState } from 'react'
import { LocalNotifications } from '@capacitor/local-notifications'

const useLocalNotifications = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestPermission = async () => {
    const result = await LocalNotifications.requestPermissions()
    return result.display === 'granted'
  }

  const scheduleNotification = async (
    title: string,
    body: string,
    seconds = 5
  ) => {
    setIsPending(true)
    setError(null)
    try {
      const granted = await requestPermission()
      if (!granted) {
        setError('Permiso denegado')
        setIsPending(false)
        return
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 10000) + 1,
            title,
            body,
            schedule: {
              at: new Date(Date.now() + seconds * 1000),
            },
          },
        ],
      })
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { isPending, error, scheduleNotification }
}

export default useLocalNotifications