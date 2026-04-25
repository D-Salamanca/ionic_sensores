import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import useMotion from '../hooks/useMotion'

export default function MotionPage() {
  const history = useHistory()
  const { accel, orientation, error } = useMotion()

  const accelRows = [
    { label: 'X', value: accel?.x?.toFixed(4) ?? 'N/A' },
    { label: 'Y', value: accel?.y?.toFixed(4) ?? 'N/A' },
    { label: 'Z', value: accel?.z?.toFixed(4) ?? 'N/A' },
  ]

  const orientationRows = [
    { label: 'Alpha', value: orientation?.alpha?.toFixed(4) ?? 'N/A' },
    { label: 'Beta', value: orientation?.beta?.toFixed(4) ?? 'N/A' },
    { label: 'Gamma', value: orientation?.gamma?.toFixed(4) ?? 'N/A' },
  ]

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

      <IonContent>
        <div className="p-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Accelerometer
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              {accelRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-semibold text-slate-800 font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Orientation
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              {orientationRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-semibold text-slate-800 font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
