import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
} from '@ionic/react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useLocalNotifications from '../hooks/useLocalNotifications'

export default function LocalNotificationsPage() {
  const history = useHistory()
  const { isPending, error, scheduleNotification } = useLocalNotifications()

  const [title, setTitle] = useState('Hello!')
  const [body, setBody] = useState('This is a local notification')
  const [seconds, setSeconds] = useState('5')

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Local Notifications</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4 space-y-3">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <IonItem lines="full">
              <IonLabel position="stacked">Title</IonLabel>
              <IonInput
                value={title}
                onIonInput={e => setTitle(e.detail.value ?? '')}
              />
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="stacked">Body</IonLabel>
              <IonInput
                value={body}
                onIonInput={e => setBody(e.detail.value ?? '')}
              />
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="stacked">Delay (seconds)</IonLabel>
              <IonInput
                value={seconds}
                type="number"
                onIonInput={e => setSeconds(e.detail.value ?? '5')}
              />
            </IonItem>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <IonButton
            expand="block"
            disabled={isPending}
            onClick={() => scheduleNotification(title, body, Number(seconds))}
          >
            Schedule Notification
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}
