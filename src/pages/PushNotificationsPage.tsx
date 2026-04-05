import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonText,
  IonButtons,
  IonButton,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import usePushNotifications from '../hooks/usePushNotifications'
import React from 'react'
export default function PushNotificationsPage() {
  const history = useHistory()
  const { token, notification, error } = usePushNotifications()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Push Notifications</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonText color="medium">
          <h3>Device Token</h3>
        </IonText>

        <IonItem>
          <IonLabel>
            <h2 style={{ fontWeight: 700 }}>Token</h2>
            <p style={{ wordBreak: 'break-all' }}>
              {token ?? 'No token yet (requires native device)'}
            </p>
          </IonLabel>
        </IonItem>

        {notification && (
          <>
            <IonText color="medium">
              <h3>Last Notification</h3>
            </IonText>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Title</h2>
                <p>{notification.title}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Body</h2>
                <p>{notification.body}</p>
              </IonLabel>
            </IonItem>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}