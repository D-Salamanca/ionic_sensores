import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonButtons,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import useHaptics from '../hooks/useHaptics'
import { ImpactStyle, NotificationType } from '@capacitor/haptics'
import React from 'react'
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

      <IonContent className="ion-padding">
        <IonText color="medium">
          <h3>Impact</h3>
        </IonText>

        <IonButton expand="block" onClick={() => impact(ImpactStyle.Light)}>
          Impact Light
        </IonButton>

        <IonButton expand="block" onClick={() => impact(ImpactStyle.Medium)}>
          Impact Medium
        </IonButton>

        <IonButton expand="block" onClick={() => impact(ImpactStyle.Heavy)}>
          Impact Heavy
        </IonButton>

        <IonText color="medium">
          <h3>Notification</h3>
        </IonText>

        <IonButton expand="block" color="success" onClick={() => notification(NotificationType.Success)}>
          Notification Success
        </IonButton>

        <IonButton expand="block" color="warning" onClick={() => notification(NotificationType.Warning)}>
          Notification Warning
        </IonButton>

        <IonButton expand="block" color="danger" onClick={() => notification(NotificationType.Error)}>
          Notification Error
        </IonButton>

        <IonText color="medium">
          <h3>Vibrate</h3>
        </IonText>

        <IonButton expand="block" fill="outline" onClick={vibrate}>
          Vibrate
        </IonButton>
      </IonContent>
    </IonPage>
  )
}