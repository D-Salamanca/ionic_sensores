import React, { useEffect } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButtons,
  IonButton,
  IonSpinner,
  IonIcon,
} from '@ionic/react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import { locationOutline } from 'ionicons/icons'
import { Geolocation } from '@capacitor/geolocation'
import useOpenCage from '../hooks/useOpenCage'

export default function NearbyPlacesPage() {
  const history = useHistory()
  const { nearbyPlaces, address, isPending, error, getAddress, getPlaces } = useOpenCage()

  useEffect(() => {
    const load = async () => {
      try {
        const pos = await Geolocation.getCurrentPosition()
        const { latitude, longitude } = pos.coords
        await getAddress(latitude, longitude)
        await getPlaces(latitude, longitude)
      } catch (e) {
        console.log(e)
      }
    }
    load()
  }, [])

  const defaultCenter: [number, number] = nearbyPlaces.length > 0
    ? [nearbyPlaces[0].lat, nearbyPlaces[0].lng]
    : [3.4516, -76.5320]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lugares Cercanos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/maps')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {address && (
          <IonItem lines="none">
            <IonIcon icon={locationOutline} slot="start" />
            <IonLabel>
              <p>{address}</p>
            </IonLabel>
          </IonItem>
        )}

        {isPending && (
          <div style={{ textAlign: 'center', padding: 16 }}>
            <IonSpinner />
            <p>Buscando lugares cercanos...</p>
          </div>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {nearbyPlaces.length > 0 && (
          <>
            <div style={{ height: 250, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
              <MapContainer
                center={defaultCenter}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {nearbyPlaces.map((place, i) => (
                  <Marker key={i} position={[place.lat, place.lng]}>
                    <Popup>{place.name}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <IonList>
              {nearbyPlaces.map((place, i) => (
                <IonItem key={i}>
                  <IonIcon icon={locationOutline} slot="start" />
                  <IonLabel>
                    <h2>{place.name}</h2>
                    <p>{place.formatted}</p>
                    <p style={{ fontSize: '0.75rem', color: 'gray' }}>{place.category}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}