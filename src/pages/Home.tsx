import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react'
import {
  locationOutline,
  cameraOutline,
  phonePortraitOutline,
  hardwareChipOutline,
  flashOutline,
  folderOutline,
  notificationsOutline,
  cloudOutline,
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import React from 'react'

const sensors = [
  {
    title: 'Geolocation',
    description: 'GPS tracking',
    icon: locationOutline,
    route: '/geolocation',
    bg: 'bg-blue-100',
    fg: 'text-blue-600',
  },
  {
    title: 'Camera',
    description: 'Photos & gallery',
    icon: cameraOutline,
    route: '/camera',
    bg: 'bg-purple-100',
    fg: 'text-purple-600',
  },
  {
    title: 'Motion',
    description: 'Accelerometer',
    icon: phonePortraitOutline,
    route: '/motion',
    bg: 'bg-orange-100',
    fg: 'text-orange-600',
  },
  {
    title: 'Device',
    description: 'Device & battery',
    icon: hardwareChipOutline,
    route: '/device',
    bg: 'bg-teal-100',
    fg: 'text-teal-600',
  },
  {
    title: 'Haptics',
    description: 'Vibration',
    icon: flashOutline,
    route: '/haptics',
    bg: 'bg-pink-100',
    fg: 'text-pink-600',
  },
  {
    title: 'Filesystem',
    description: 'Read & write files',
    icon: folderOutline,
    route: '/filesystem',
    bg: 'bg-yellow-100',
    fg: 'text-yellow-600',
  },
  {
    title: 'Notifications',
    description: 'Local alerts',
    icon: notificationsOutline,
    route: '/local-notifications',
    bg: 'bg-green-100',
    fg: 'text-green-600',
  },
  {
    title: 'Push Notifs',
    description: 'Native push',
    icon: cloudOutline,
    route: '/push-notifications',
    bg: 'bg-indigo-100',
    fg: 'text-indigo-600',
  },
]

const Home: React.FC = () => {
  const history = useHistory()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensors Hub</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4">
          <p className="text-sm text-slate-400 font-medium mb-5">
            Select a sensor to explore
          </p>
          <div className="grid grid-cols-2 gap-3">
            {sensors.map(sensor => (
              <button
                key={sensor.route}
                onClick={() => history.push(sensor.route)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center gap-2 active:opacity-70 transition-opacity cursor-pointer appearance-none"
              >
                <div
                  className={`w-12 h-12 rounded-full ${sensor.bg} flex items-center justify-center`}
                >
                  <IonIcon
                    icon={sensor.icon}
                    className={sensor.fg}
                    style={{ fontSize: '22px' }}
                  />
                </div>
                <span className="font-semibold text-slate-700 text-sm">
                  {sensor.title}
                </span>
                <span className="text-xs text-slate-400 text-center leading-tight">
                  {sensor.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home
