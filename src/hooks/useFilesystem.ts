import { useState } from 'react'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

const useFilesystem = () => {
  const [content, setContent] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const writeFile = async (fileName: string, data: string) => {
    setIsPending(true)
    setError(null)
    try {
      await Filesystem.writeFile({
        path: fileName,
        data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      })
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const readFile = async (fileName: string) => {
    setIsPending(true)
    setError(null)
    try {
      const result = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      })
      setContent(result.data as string)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const deleteFile = async (fileName: string) => {
    setIsPending(true)
    setError(null)
    try {
      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Documents,
      })
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { content, isPending, error, writeFile, readFile, deleteFile }
}

export default useFilesystem