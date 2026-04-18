import React, { useEffect, useState } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonText,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
} from '@ionic/react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import useNetwork from '../hooks/useNetwork'
import useTracking from '../hooks/useTracking'
import useOpenCage from '../hooks/useOpenCage'
import { navigateOutline, stopOutline, cameraOutline } from 'ionicons/icons'
import L from 'leaflet'

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function MapsPage() {
  const history = useHistory()
  const { isOnline } = useNetwork()
  const {
    isTracking,
    currentPosition,
    trackPoints,
    isMoving,
    batteryLevel,
    error,
    startTracking,
    stopTracking,
  } = useTracking()
  const { address, getAddress } = useOpenCage()
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    if (currentPosition && isOnline) {
      getAddress(currentPosition.lat, currentPosition.lng)
    }
  }, [currentPosition, isOnline])

  const handleTakePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      })
      setPhoto(image.dataUrl ?? null)
    } catch (e) {
      console.log(e) 
    }
  }

  const defaultCenter: [number, number] = currentPosition
    ? [currentPosition.lat, currentPosition.lng]
    : [3.4516, -76.5320]

  const polylinePoints: [number, number][] = trackPoints.map(p => [p.lat, p.lng])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Maps & Tracking</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Status bar */}
        <IonItem lines="none">
          <IonLabel>
            <p>Red: <IonBadge color={isOnline ? 'success' : 'danger'}>{isOnline ? 'Online' : 'Offline'}</IonBadge></p>
            <p>Movimiento: <IonBadge color={isMoving ? 'warning' : 'medium'}>{isMoving ? 'Moviendo' : 'Quieto'}</IonBadge></p>
            <p>Batería: {(batteryLevel * 100).toFixed(0)}%</p>
          </IonLabel>
        </IonItem>

        {address && (
          <IonItem lines="none">
            <IonLabel>
              <p style={{ fontSize: '0.8rem' }}>{address}</p>
            </IonLabel>
          </IonItem>
        )}

        {error && (
          <IonText color="danger">
            <p className="ion-padding">{error}</p>
          </IonText>
        )}

        {/* Mapa */}
        <div style={{ height: '350px', width: '100%' }}>
          <MapContainer
            center={defaultCenter}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />

            {currentPosition && (
              <Marker position={[currentPosition.lat, currentPosition.lng]}>
                <Popup>Tu ubicación actual</Popup>
              </Marker>
            )}

            {polylinePoints.length > 1 && (
              <Polyline positions={polylinePoints} color="blue" />
            )}
          </MapContainer>
        </div>

        {/* Botones */}
        <div className="ion-padding">
          <IonButton
            expand="block"
            color={isTracking ? 'danger' : 'success'}
            onClick={isTracking ? stopTracking : startTracking}
          >
            <IonIcon icon={isTracking ? stopOutline : navigateOutline} slot="start" />
            {isTracking ? 'Detener Tracking' : 'Iniciar Tracking'}
          </IonButton>

          <IonButton expand="block" fill="outline" onClick={handleTakePhoto}>
            <IonIcon icon={cameraOutline} slot="start" />
            Tomar Foto con Ubicación
          </IonButton>
        </div>

        {/* Foto con watermark de ubicación */}
        {photo && currentPosition && (
          <div style={{ position: 'relative', margin: '0 16px 16px' }}>
            <img src={photo} style={{ width: '100%', borderRadius: 8 }} />
            <div style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: '0.75rem',
            }}>
              📍 {currentPosition.lat.toFixed(5)}, {currentPosition.lng.toFixed(5)}
            </div>
          </div>
        )}

        <IonButton
          expand="block"
          fill="clear"
          className="ion-padding-horizontal"
          onClick={() => history.push('/tracking-history')}
        >
          Ver historial de tracking
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          className="ion-padding-horizontal"
          onClick={() => history.push('/nearby-places')}
        >
          Ver lugares cercanos
        </IonButton>
      </IonContent>
    </IonPage>
  )
}