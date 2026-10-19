import { useState } from "react"
import axios from "axios"
import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/toast"
import { DatabaseArrowDown, DatabaseBackupIcon } from "lucide-react"

export function BackupDB() {
  const [busy, setBusy] = useState(false)

  const showToast = () => {
    const id = toast.add({
      title: 'Databse Backup Successful',
      actionProps: {
        onClick() {
          toast.close(id)
        }
      }
    })
  }

  const showErrorToast = () => {
    const id = toast.add({
      title: 'Databse Backup Failed',
      actionProps: {
        onClick() {
          toast.close(id)
        }
      }
    })
  }

  const handleBackup = async () => {
    setBusy(true)
    try {
      const { data } = await axios.post('http://localhost:3000/api/backup')
      console.log(`Saved: ${data}`)
      showToast()
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.error ?? 'Backup failed')
      showErrorToast()
      } else {
        console.log('Backup failed')
      }
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <Button variant="outline" onClick={handleBackup} disabled={busy}>
        {busy ? <DatabaseArrowDown /> : <DatabaseBackupIcon />}
      </Button>
    </>
  )
}
