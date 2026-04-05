import { useState, useEffect } from 'react'
import { PushNotifications } from '@capacitor/push-notifications'

const usePushNotifications = () => {
  const [token, setToken] = useState<string | null>(null)
  const [notification, setNotification] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const register = async () => {
      try {
        const permission = await PushNotifications.requestPermissions()

        if (permission.receive === 'granted') {
          await PushNotifications.register()
        } else {
          setError('Permiso denegado')
        }

        PushNotifications.addListener('registration', (t) => {
          setToken(t.value)
        })

        PushNotifications.addListener('registrationError', (err) => {
          setError(err.error)
        })

        PushNotifications.addListener('pushNotificationReceived', (n) => {
          setNotification(n)
        })
      } catch (err: any) {
        setError(err.message)
      }
    }

    register()

    return () => {
      PushNotifications.removeAllListeners()
    }
  }, [])

  return { token, notification, error }
}

export default usePushNotifications