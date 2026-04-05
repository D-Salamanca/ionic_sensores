import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonButtons,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import useGeolocation from '../hooks/useGeolocation'
import React from 'react'
export default function GeolocationPage() {
  const history = useHistory()
  const { position, isPending, error, getCurrentPosition, watchPosition } = useGeolocation()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Geolocation</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getCurrentPosition} disabled={isPending}>
          Get Current Position
        </IonButton>

        <IonButton expand="block" fill="outline" onClick={watchPosition}>
          Watch Position
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {position && (
          <>
            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Latitude</h2>
                <p>{position.coords.latitude}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Longitude</h2>
                <p>{position.coords.longitude}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Altitude</h2>
                <p>{position.coords.altitude ?? 'N/A'}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Speed</h2>
                <p>{position.coords.speed ?? 'N/A'}</p>
              </IonLabel>
            </IonItem>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}