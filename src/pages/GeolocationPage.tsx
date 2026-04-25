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
import useGeolocation from '../hooks/useGeolocation'

export default function GeolocationPage() {
  const history = useHistory()
  const { position, isPending, error, getCurrentPosition, watchPosition } = useGeolocation()

  const rows = position
    ? [
        { label: 'Latitude', value: position.coords.latitude.toFixed(6) },
        { label: 'Longitude', value: position.coords.longitude.toFixed(6) },
        {
          label: 'Altitude',
          value:
            position.coords.altitude != null
              ? `${position.coords.altitude.toFixed(1)} m`
              : 'N/A',
        },
        {
          label: 'Speed',
          value:
            position.coords.speed != null
              ? `${position.coords.speed.toFixed(2)} m/s`
              : 'N/A',
        },
      ]
    : []

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

      <IonContent>
        <div className="p-4 space-y-3">
          <IonButton expand="block" onClick={getCurrentPosition} disabled={isPending}>
            Get Current Position
          </IonButton>
          <IonButton expand="block" fill="outline" onClick={watchPosition}>
            Watch Position
          </IonButton>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {position && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-2">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Location Data
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {rows.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-4 py-3">
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className="text-sm font-semibold text-slate-800 font-mono">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
