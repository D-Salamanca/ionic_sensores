import React, { useEffect, useState } from 'react'
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
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/react'
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import useTracking, { type TrackingSession } from '../hooks/useTracking'

export default function TrackingHistoryPage() {
  const history = useHistory()
  const { loadSessions } = useTracking()
  const [sessions, setSessions] = useState<TrackingSession[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await loadSessions()
      setSessions(data)
    }
    load()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Historial de Tracking</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/maps')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {sessions.length === 0 ? (
          <IonText color="medium">
            <p className="ion-text-center">No hay sesiones guardadas aún.</p>
          </IonText>
        ) : (
          <IonAccordionGroup>
            {sessions.map((session, index) => {
              const date = new Date(session.date).toLocaleString()
              const points: [number, number][] = session.points.map(p => [p.lat, p.lng])
              const center: [number, number] = points.length > 0
                ? points[0]
                : [3.4516, -76.5320]

              return (
                <IonAccordion key={index} value={String(index)}>
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>Sesión {index + 1}</h2>
                      <p>{date}</p>
                      <p>{session.points.length} puntos registrados</p>
                    </IonLabel>
                  </IonItem>

                  <div slot="content" style={{ padding: 16 }}>
                    {points.length > 0 && (
                      <div style={{ height: 250, borderRadius: 8, overflow: 'hidden' }}>
                        <MapContainer
                          center={center}
                          zoom={15}
                          style={{ height: '100%', width: '100%' }}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker position={center} />
                          {points.length > 1 && (
                            <Polyline positions={points} color="blue" />
                          )}
                        </MapContainer>
                      </div>
                    )}

                    <IonList>
                      {session.points.slice(0, 5).map((point, i) => (
                        <IonItem key={i}>
                          <IonLabel>
                            <p>{new Date(point.timestamp).toLocaleTimeString()}</p>
                            <p>Lat: {point.lat.toFixed(5)} Lng: {point.lng.toFixed(5)}</p>
                            {point.speed !== undefined && (
                              <p>Velocidad: {(point.speed * 3.6).toFixed(1)} km/h</p>
                            )}
                          </IonLabel>
                        </IonItem>
                      ))}
                      {session.points.length > 5 && (
                        <IonItem>
                          <IonLabel>
                            <p>... y {session.points.length - 5} puntos más</p>
                          </IonLabel>
                        </IonItem>
                      )}
                    </IonList>
                  </div>
                </IonAccordion>
              )
            })}
          </IonAccordionGroup>
        )}
      </IonContent>
    </IonPage>
  )
}