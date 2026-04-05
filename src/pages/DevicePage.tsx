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
import useDevice from '../hooks/useDevice'
import React from 'react'
export default function DevicePage() {
  const history = useHistory()
  const { info, battery, isPending, error, getInfo, getBattery } = useDevice()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Device</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getInfo} disabled={isPending}>
          Get Device Info
        </IonButton>

        <IonButton expand="block" fill="outline" onClick={getBattery} disabled={isPending}>
          Get Battery Info
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {info && (
          <>
            <IonText color="medium">
              <h3>Device Info</h3>
            </IonText>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Model</h2>
                <p>{info.model}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Platform</h2>
                <p>{info.platform}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>OS Version</h2>
                <p>{info.osVersion}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Manufacturer</h2>
                <p>{info.manufacturer}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Memory Used</h2>
                <p>{info.memUsed ?? 'N/A'}</p>
              </IonLabel>
            </IonItem>
          </>
        )}

        {battery && (
          <>
            <IonText color="medium">
              <h3>Battery Info</h3>
            </IonText>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Battery Level</h2>
                <p>{(battery.batteryLevel * 100).toFixed(0)}%</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700 }}>Charging</h2>
                <p>{battery.isCharging ? 'Yes' : 'No'}</p>
              </IonLabel>
            </IonItem>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}