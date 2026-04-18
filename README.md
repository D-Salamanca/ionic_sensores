# Challenge 08 - Ionic Maps & Sensors App

Aplicación móvil desarrollada con Ionic + React + Capacitor que combina
mapas interactivos con sensores nativos del dispositivo.

## Tecnologías

- Ionic React
- Capacitor
- TypeScript
- Leaflet + React Leaflet (mapas)
- OpenCage API (geocodificación y lugares cercanos)
- Firebase Cloud Messaging (Push Notifications)
- OpenStreetMap (tiles del mapa)

## Funcionalidades

### Maps & Tracking
- Mapa interactivo con OpenStreetMap
- Tracking GPS en tiempo real con ruta dibujada
- Detección de movimiento con acelerómetro
- Vibración al iniciar tracking (Haptics)
- Detención automática por batería baja
- Foto con marca de ubicación como watermark
- Dirección actual con OpenCage reverse geocoding

### Historial de Tracking
- Guarda cada sesión de tracking en un archivo JSON
- Muestra el historial de sesiones del día
- Visualiza cada ruta en un mapa

### Lugares Cercanos
- Busca lugares cercanos usando OpenCage API
- Muestra los resultados en un mapa y lista

### Sensores (Challenge 07)
- Geolocation — GPS
- Camera — cámara y galería
- Motion — acelerómetro y orientación
- Device — info del dispositivo y batería
- Haptics — vibración táctil
- Filesystem — lectura y escritura de archivos
- Local Notifications — notificaciones programadas
- Push Notifications — Firebase Cloud Messaging

## Notificaciones inteligentes
- Sin movimiento por más de 5 minutos
- Batería baja detectada automáticamente


## Estructura del proyecto
```
src/
├── hooks/
│   ├── useGeolocation.ts
│   ├── useCamera.ts
│   ├── useMotion.ts
│   ├── useDevice.ts
│   ├── useHaptics.ts
│   ├── useFilesystem.ts
│   ├── useLocalNotifications.ts
│   ├── usePushNotifications.ts
│   ├── useNetwork.ts
│   ├── useTracking.ts
│   └── useOpenCage.ts
├── pages/
│   ├── GeolocationPage.tsx
│   ├── CameraPage.tsx
│   ├── MotionPage.tsx
│   ├── DevicePage.tsx
│   ├── HapticsPage.tsx
│   ├── FilesystemPage.tsx
│   ├── LocalNotificationsPage.tsx
│   ├── PushNotificationsPage.tsx
│   ├── MapsPage.tsx
│   ├── TrackingHistoryPage.tsx
│   └── NearbyPlacesPage.tsx
├── services/
│   └── opencage.ts
├── App.tsx
├── Home.tsx
└── main.tsx
```

## Instalación

```bash
npm install
ionic build
npx cap sync android
npx cap open android
```

## Variables de configuración

Configura tu API key de OpenCage en:
`src/services/opencage.ts`

```ts
const OPENCAGE_API_KEY = 'TU_API_KEY_AQUI'
```

Obtén tu API key gratis en: https://opencagedata.com/

## Permisos Android requeridos

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.ACCESS_VIBRATOR_STATE" />
```

<img width="1919" height="899" alt="image" src="https://github.com/user-attachments/assets/814ed689-142a-4f6c-9eab-ed3a0b2a5fe5" />

