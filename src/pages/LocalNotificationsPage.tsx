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
  IonText,
  IonButtons,
} from '@ionic/react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useLocalNotifications from '../hooks/useLocalNotifications'
import React from 'react'
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

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput
            value={title}
            onIonInput={e => setTitle(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Body</IonLabel>
          <IonInput
            value={body}
            onIonInput={e => setBody(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Delay (seconds)</IonLabel>
          <IonInput
            value={seconds}
            type="number"
            onIonInput={e => setSeconds(e.detail.value ?? '5')}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          className="ion-margin-top"
          disabled={isPending}
          onClick={() => scheduleNotification(title, body, Number(seconds))}
        >
          Schedule Notification
        </IonButton>
      </IonContent>
    </IonPage>
  )
}