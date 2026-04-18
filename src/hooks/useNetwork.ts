import { useState, useEffect } from 'react'
import { Network, ConnectionStatus } from '@capacitor/network'

const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [connectionType, setConnectionType] = useState<string | null>(null)

  useEffect(() => {
    const checkInitialStatus = async () => {
      const status = await Network.getStatus()
      setIsOnline(status.connected)
      setConnectionType(status.connectionType)
    }

    checkInitialStatus()

    const listener = Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      setIsOnline(status.connected)
      setConnectionType(status.connectionType)
    })

    return () => {
      listener.then((l: any) => l.remove())
    }
  }, [])

  return { isOnline, connectionType }
}

export default useNetwork