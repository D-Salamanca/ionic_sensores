import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonImg,
  IonButtons,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import useCamera from '../hooks/useCamera'
import React from 'react'
export default function CameraPage() {
  const history = useHistory()
  const { photo, isPending, error, takePhoto, pickFromGallery } = useCamera()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Camera</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={takePhoto} disabled={isPending}>
          Take Photo
        </IonButton>

        <IonButton expand="block" fill="outline" onClick={pickFromGallery} disabled={isPending}>
          Pick from Gallery
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {photo && (
          <IonImg
            src={photo}
            style={{ marginTop: 16, borderRadius: 8 }}
          />
        )}
      </IonContent>
    </IonPage>
  )
}