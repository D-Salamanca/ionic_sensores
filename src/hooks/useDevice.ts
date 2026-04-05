import { useState } from 'react'
import { Device } from '@capacitor/device'

const useDevice = () => {
  const [info, setInfo] = useState<any>(null)
  const [battery, setBattery] = useState<any>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getInfo = async () => {
    setIsPending(true)
    setError(null)
    try {
      const deviceInfo = await Device.getInfo()
      setInfo(deviceInfo)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const getBattery = async () => {
    setIsPending(true)
    setError(null)
    try {
      const batteryInfo = await Device.getBatteryInfo()
      setBattery(batteryInfo)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { info, battery, isPending, error, getInfo, getBattery }
}

export default useDevice