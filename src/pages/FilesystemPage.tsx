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
  IonButtons,
} from '@ionic/react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useFilesystem from '../hooks/useFilesystem'

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

      <IonContent>
        <div className="p-4 space-y-3">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <IonItem lines="full">
              <IonLabel position="stacked">File Name</IonLabel>
              <IonInput
                value={fileName}
                onIonInput={e => setFileName(e.detail.value ?? '')}
              />
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="stacked">Content</IonLabel>
              <IonTextarea
                value={fileData}
                rows={4}
                onIonInput={e => setFileData(e.detail.value ?? '')}
              />
            </IonItem>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <IonButton
            expand="block"
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
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  File Content
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-slate-700 font-mono whitespace-pre-wrap">{content}</p>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
