import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'

const useHaptics = () => {
  const impact = async (style: ImpactStyle = ImpactStyle.Medium) => {
    await Haptics.impact({ style })
  }

  const notification = async (type: NotificationType = NotificationType.Success) => {
    await Haptics.notification({ type })
  }

  const vibrate = async () => {
    await Haptics.vibrate()
  }

  const selectionStart = async () => {
    await Haptics.selectionStart()
  }

  const selectionChanged = async () => {
    await Haptics.selectionChanged()
  }

  const selectionEnd = async () => {
    await Haptics.selectionEnd()
  }

  return { impact, notification, vibrate, selectionStart, selectionChanged, selectionEnd }
}

export default useHaptics