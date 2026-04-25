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
import useDevice from '../hooks/useDevice'

export default function DevicePage() {
  const history = useHistory()
  const { info, battery, isPending, error, getInfo, getBattery } = useDevice()

  const deviceRows = info
    ? [
        { label: 'Model', value: info.model },
        { label: 'Platform', value: info.platform },
        { label: 'OS Version', value: info.osVersion },
        { label: 'Manufacturer', value: info.manufacturer },
        { label: 'Memory Used', value: info.memUsed != null ? `${info.memUsed}` : 'N/A' },
      ]
    : []

  const batteryRows = battery
    ? [
        { label: 'Battery Level', value: `${(battery.batteryLevel * 100).toFixed(0)}%` },
        { label: 'Charging', value: battery.isCharging ? 'Yes' : 'No' },
      ]
    : []

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

      <IonContent>
        <div className="p-4 space-y-3">
          <IonButton expand="block" onClick={getInfo} disabled={isPending}>
            Get Device Info
          </IonButton>
          <IonButton expand="block" fill="outline" onClick={getBattery} disabled={isPending}>
            Get Battery Info
          </IonButton>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {info && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-2">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Device Info
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {deviceRows.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-4 py-3">
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className="text-sm font-semibold text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {battery && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Battery Info
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {batteryRows.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-4 py-3">
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className="text-sm font-semibold text-slate-800">{value}</span>
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
