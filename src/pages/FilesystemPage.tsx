import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonText,
  IonButtons,
} from '@ionic/react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useFilesystem from '../hooks/useFilesystem'
import React from 'react'
export default function FilesystemPage() {
  const history = useHistory()
  const { content, isPending, error, writeFile, readFile, deleteFile } = useFilesystem()

  const [fileName, setFileName] = useState('test.txt')
  const [fileData, setFileData] = useState('')

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filesystem</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">File Name</IonLabel>
          <IonInput
            value={fileName}
            onIonInput={e => setFileName(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Content</IonLabel>
          <IonTextarea
            value={fileData}
            rows={4}
            onIonInput={e => setFileData(e.detail.value ?? '')}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          className="ion-margin-top"
          disabled={isPending}
          onClick={() => writeFile(fileName, fileData)}
        >
          Write File
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          disabled={isPending}
          onClick={() => readFile(fileName)}
        >
          Read File
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          fill="outline"
          disabled={isPending}
          onClick={() => deleteFile(fileName)}
        >
          Delete File
        </IonButton>

        {content && (
          <>
            <IonText color="medium">
              <h3>File Content</h3>
            </IonText>
            <IonText>
              <p>{content}</p>
            </IonText>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}