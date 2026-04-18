import React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
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
  navigateOutline,
  timeOutline,
  searchOutline,
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'

const Home: React.FC = () => {
  const history = useHistory()

  const sensors = [
    {
      title: 'Geolocation',
      description: 'GPS position tracking',
      icon: locationOutline,
      route: '/geolocation',
    },
    {
      title: 'Camera',
      description: 'Take photos or pick from gallery',
      icon: cameraOutline,
      route: '/camera',
    },
    {
      title: 'Motion',
      description: 'Accelerometer and orientation',
      icon: phonePortraitOutline,
      route: '/motion',
    },
    {
      title: 'Device',
      description: 'Device and battery info',
      icon: hardwareChipOutline,
      route: '/device',
    },
    {
      title: 'Haptics',
      description: 'Vibration and tactile feedback',
      icon: flashOutline,
      route: '/haptics',
    },
    {
      title: 'Filesystem',
      description: 'Read and write files',
      icon: folderOutline,
      route: '/filesystem',
    },
    {
      title: 'Local Notifications',
      description: 'Schedule local notifications',
      icon: notificationsOutline,
      route: '/local-notifications',
    },
    {
      title: 'Push Notifications',
      description: 'Native push notifications',
      icon: cloudOutline,
      route: '/push-notifications',
    },
    {
      title: 'Maps & Tracking',
      description: 'GPS tracking con mapa en tiempo real',
      icon: navigateOutline,
      route: '/maps',
    },
    {
      title: 'Historial de Tracking',
      description: 'Ver rutas guardadas',
      icon: timeOutline,
      route: '/tracking-history',
    },
    {
      title: 'Lugares Cercanos',
      description: 'OpenCage API nearby places',
      icon: searchOutline,
      route: '/nearby-places',
    },
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge 08 - Sensors</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {sensors.map(sensor => (
            <IonItem
              key={sensor.route}
              button
              onClick={() => history.push(sensor.route)}
            >
              <IonIcon icon={sensor.icon} slot="start" />
              <IonLabel>
                <h2>{sensor.title}</h2>
                <p>{sensor.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Home