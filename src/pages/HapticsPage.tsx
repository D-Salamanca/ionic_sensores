import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import useHaptics from '../hooks/useHaptics'
import { ImpactStyle, NotificationType } from '@capacitor/haptics'

export default function HapticsPage() {
  const history = useHistory()
  const { impact, notification, vibrate } = useHaptics()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Haptics</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4 space-y-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Impact
            </p>
            <div className="space-y-2">
              <IonButton expand="block" onClick={() => impact(ImpactStyle.Light)}>
                Light
              </IonButton>
              <IonButton expand="block" onClick={() => impact(ImpactStyle.Medium)}>
                Medium
              </IonButton>
              <IonButton expand="block" onClick={() => impact(ImpactStyle.Heavy)}>
                Heavy
              </IonButton>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Notification
            </p>
            <div className="space-y-2">
              <IonButton
                expand="block"
                color="success"
                onClick={() => notification(NotificationType.Success)}
              >
                Success
              </IonButton>
              <IonButton
                expand="block"
                color="warning"
                onClick={() => notification(NotificationType.Warning)}
              >
                Warning
              </IonButton>
              <IonButton
                expand="block"
                color="danger"
                onClick={() => notification(NotificationType.Error)}
              >
                Error
              </IonButton>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Vibrate
            </p>
            <IonButton expand="block" fill="outline" onClick={vibrate}>
              Vibrate
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
