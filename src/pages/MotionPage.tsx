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
import useMotion from '../hooks/useMotion'
import React from 'react'
export default function MotionPage() {
  const history = useHistory()
  const { accel, orientation, error } = useMotion()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Motion</IonTitle>
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
          <h3>Accelerometer</h3>
        </IonText>

        <IonItem>
          <IonLabel>
            <h2 style={{ fontWeight: 700 }}>X</h2>
            <p>{accel?.x?.toFixed(4) ?? 'N/A'}</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2 style={{ fontWeight: 700 }}>Y</h2>
            <p>{accel?.y?.toFixed(4) ?? 'N/A'}</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2 style={{ fontWeight: 700 }}>Z</h2>
            <p>{accel?.z?.toFixed(4) ?? 'N/A'}</p>
          </IonLabel>
        </IonItem>

        <IonText color="medium">
          <h3>Orientation</h3>
        </IonText>

        <IonItem>
          <IonLabel>
            <h2 style={{ fontWeight: 700 }}>Alpha</h2>
            <p>{orientation?.alpha?.toFixed(4) ?? 'N/A'}</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2 style={{ fontWeight: 700 }}>Beta</h2>
            <p>{orientation?.beta?.toFixed(4) ?? 'N/A'}</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2 style={{ fontWeight: 700 }}>Gamma</h2>
            <p>{orientation?.gamma?.toFixed(4) ?? 'N/A'}</p>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  )
}