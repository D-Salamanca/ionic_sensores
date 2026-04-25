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
import usePushNotifications from '../hooks/usePushNotifications'

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
                Device Token
              </p>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-slate-700 font-mono break-all leading-relaxed">
                {token ?? 'No token yet (requires native device)'}
              </p>
            </div>
          </div>

          {notification && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Last Notification
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm text-slate-500">Title</span>
                  <span className="text-sm font-semibold text-slate-800">{notification.title}</span>
                </div>
                <div className="flex justify-between items-start px-4 py-3">
                  <span className="text-sm text-slate-500">Body</span>
                  <span className="text-sm font-semibold text-slate-800 text-right max-w-xs">
                    {notification.body}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
