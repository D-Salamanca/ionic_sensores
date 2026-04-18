import { useState, useEffect, useRef } from 'react'
import { Geolocation } from '@capacitor/geolocation'
import { Motion } from '@capacitor/motion'
import { Device } from '@capacitor/device'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { PluginListenerHandle } from '@capacitor/core'

export interface TrackPoint {
  lat: number
  lng: number
  timestamp: string
  speed?: number
}

export interface TrackingSession {
  date: string
  points: TrackPoint[]
}

const useTracking = () => {
  const [isTracking, setIsTracking] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<TrackPoint | null>(null)
  const [trackPoints, setTrackPoints] = useState<TrackPoint[]>([])
  const [isMoving, setIsMoving] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)

  const watchIdRef = useRef<string | null>(null)
  const motionListenerRef = useRef<PluginListenerHandle | null>(null)
  const lastNotifTimeRef = useRef<number>(0)
  const lastMovingTimeRef = useRef<number>(Date.now())

  // Monitorear batería
  useEffect(() => {
    const checkBattery = async () => {
      const battery = await Device.getBatteryInfo()
      setBatteryLevel(battery.batteryLevel ?? 1)

      if ((battery.batteryLevel ?? 1) < 0.15 && isTracking) {
        await stopTracking()
        await scheduleNotification(
          'Batería baja',
          'El tracking se detuvo automáticamente por batería baja.',
          1
        )
      }
    }

    const interval = setInterval(checkBattery, 30000)
    checkBattery()
    return () => clearInterval(interval)
  }, [isTracking])

  const scheduleNotification = async (title: string, body: string, id: number) => {
    try {
      await LocalNotifications.requestPermissions()
      await LocalNotifications.schedule({
        notifications: [{
          id,
          title,
          body,
          schedule: { at: new Date(Date.now() + 1000) },
        }],
      })
    } catch (e) {
      // Notification scheduling is non-critical, fail silently
    }
  }

  const startTracking = async () => {
    try {
      setError(null)
      setTrackPoints([])

      // Vibrar al iniciar
      await Haptics.impact({ style: ImpactStyle.Heavy })

      // Iniciar escucha de movimiento
      motionListenerRef.current = await Motion.addListener('accel', (event) => {
        const { x, y, z } = event.acceleration
        const magnitude = Math.sqrt(x * x + y * y + z * z)
        const moving = magnitude > 2

        setIsMoving(moving)
        if (moving) lastMovingTimeRef.current = Date.now()

        // Notificación si lleva mucho tiempo sin moverse
        const now = Date.now()
        const timeSinceMove = now - lastMovingTimeRef.current
        if (timeSinceMove > 300000 && now - lastNotifTimeRef.current > 300000) {
          lastNotifTimeRef.current = now
          scheduleNotification(
            'Sin movimiento',
            'Llevas más de 5 minutos sin moverte.',
            2
          )
        }
      })

      // Iniciar GPS
      watchIdRef.current = await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          if (err) {
            setError(err.message)
            return
          }
          if (!position) return

          const point: TrackPoint = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date().toISOString(),
            speed: position.coords.speed ?? 0,
          }

          setCurrentPosition(point)
          setTrackPoints(prev => [...prev, point])
        }
      )

      setIsTracking(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const stopTracking = async () => {
    if (watchIdRef.current) {
      await Geolocation.clearWatch({ id: watchIdRef.current })
      watchIdRef.current = null
    }

    if (motionListenerRef.current) {
      motionListenerRef.current.remove()
      motionListenerRef.current = null
    }

    setIsTracking(false)

    // Guardar sesión en archivo
    await saveSession()
  }

  const saveSession = async () => {
    try {
      const session: TrackingSession = {
        date: new Date().toISOString(),
        points: trackPoints,
      }

      const fileName = `tracking_${Date.now()}.json`
      await Filesystem.writeFile({
        path: fileName,
        data: JSON.stringify(session),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const loadSessions = async (): Promise<TrackingSession[]> => {
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents,
      })

      const sessions: TrackingSession[] = []

      for (const file of result.files) {
        if (file.name.startsWith('tracking_')) {
          const content = await Filesystem.readFile({
            path: file.name,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          })
          sessions.push(JSON.parse(content.data as string))
        }
      }

      return sessions.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    } catch (e) {
      // Return empty array if directory read fails
      return []
    }
  }

  return {
    isTracking,
    currentPosition,
    trackPoints,
    isMoving,
    batteryLevel,
    error,
    startTracking,
    stopTracking,
    loadSessions,
  }
}

export default useTracking