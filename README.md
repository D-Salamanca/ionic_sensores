# Challenge 07 - Ionic Sensors App

Aplicación móvil desarrollada con Ionic + React + Capacitor que implementa
los sensores nativos del dispositivo mediante Custom Hooks.

## Tecnologías

- Ionic React
- Capacitor
- TypeScript
- Firebase Cloud Messaging (Push Notifications)

## Sensores implementados

### Geolocation
Obtiene la posición actual del dispositivo usando GPS.
Permite también escuchar cambios de posición en tiempo real con watchPosition.

### Camera
Permite tomar fotos con la cámara del dispositivo o seleccionar
imágenes desde la galería.

### Motion
Detecta movimientos del dispositivo mediante el acelerómetro y
la orientación en tiempo real.

### Device
Muestra información del dispositivo como modelo, plataforma,
versión del sistema operativo y nivel de batería.

### Haptics
Proporciona retroalimentación táctil mediante vibración.
Soporta diferentes tipos de impacto y notificación.

### Filesystem
Permite leer, escribir y eliminar archivos en el dispositivo
usando la API de sistema de archivos nativa.

### Local Notifications
Programa notificaciones locales con título, cuerpo y
tiempo de entrega configurable.

### Push Notifications
Integración con Firebase Cloud Messaging para recibir
notificaciones push. Muestra el token del dispositivo
para pruebas desde Firebase Console.

## Estructura del proyecto
src/
hooks/
useGeolocation.ts
useCamera.ts
useMotion.ts
useDevice.ts
useHaptics.ts
useFilesystem.ts
useLocalNotifications.ts
usePushNotifications.ts
pages/
GeolocationPage.tsx
CameraPage.tsx
MotionPage.tsx
DevicePage.tsx
HapticsPage.tsx
FilesystemPage.tsx
LocalNotificationsPage.tsx
PushNotificationsPage.tsx
App.tsx
Home.tsx

## Instalación
```bash
npm install
ionic build
npx cap sync android
npx cap open android
```

## Permisos Android requeridos
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.ACCESS_VIBRATOR_STATE" />
```

## Imagenes de la app 
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">

  <img src="https://github.com/user-attachments/assets/42168bfd-7876-44bc-bb73-fb1a845ef939" width="250"/>

  <img src="https://github.com/user-attachments/assets/eb91905f-9550-47dd-b955-7133de087c19" width="250"/>

  <img src="https://github.com/user-attachments/assets/aa920b48-2f8c-4fa8-9a70-0bfb6a4e6eeb" width="250"/>

  <img src="https://github.com/user-attachments/assets/dd079bed-16b5-472f-bc67-5c3ab4e1b04f" width="250"/>

  <img src="https://github.com/user-attachments/assets/43c77969-7027-437b-bbe8-b83d3fc06912" width="250"/>

  <img src="https://github.com/user-attachments/assets/c5ec5781-e8c7-497e-a85d-0c7929a4c62f" width="250"/>

  <img src="https://github.com/user-attachments/assets/6eb2ab29-74c4-4a46-a84a-6a4e53e2aa40" width="250"/>

  <img src="https://github.com/user-attachments/assets/f0b603dd-11bd-4593-89a9-cb6c3db64390" width="250"/>

</div>





