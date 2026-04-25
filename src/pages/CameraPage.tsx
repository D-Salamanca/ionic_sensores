import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonButtons,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import useCamera from '../hooks/useCamera'

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

      <IonContent>
        <div className="p-4 space-y-3">
          <IonButton expand="block" onClick={takePhoto} disabled={isPending}>
            Take Photo
          </IonButton>
          <IonButton
            expand="block"
            fill="outline"
            onClick={pickFromGallery}
            disabled={isPending}
          >
            Pick from Gallery
          </IonButton>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {photo && (
            <div className="mt-2 bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Photo Preview
                </p>
              </div>
              <IonImg src={photo} className="w-full" />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
