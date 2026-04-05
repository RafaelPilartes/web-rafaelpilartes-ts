import { useCallback, useState } from 'react'
import { X, Image as ImageIcon } from 'lucide-react'
import { useStorageViewModel } from '@/viewModels/storage.viewmodel'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  bucket?: string
  path?: string
  label?: string
}

export function ImageUploader({
  value,
  onChange,
  bucket = 'images',
  path = '',
  label = 'Upload image'
}: ImageUploaderProps) {
  const { uploadFile, loading } = useStorageViewModel()
  const [dragActive, setDragActive] = useState(false)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return
    try {
      const result = await uploadFile(file, bucket, path)
      if (result) onChange(result.url)
    } catch {
      // error handled by viewmodel toast
    }
  }, [bucket, path, uploadFile, onChange])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  return (
    <div>
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--dash-text)' }}
        >
          {label}
        </label>
      )}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden" style={{ border: '1px solid var(--dash-border)' }}>
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => onChange('')}
              className="dash-btn dash-btn-danger dash-btn-sm"
            >
              <X size={14} />
              Remover
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={() => setDragActive(false)}
          className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl cursor-pointer transition-colors"
          style={{
            border: `2px dashed ${dragActive ? 'var(--dash-accent)' : 'var(--dash-border)'}`,
            background: dragActive ? 'var(--dash-accent-soft)' : 'transparent'
          }}
          onClick={() => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.onchange = e => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) handleFile(file)
            }
            input.click()
          }}
        >
          {loading ? (
            <div
              className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'var(--dash-accent)', borderTopColor: 'transparent' }}
            />
          ) : (
            <>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--dash-surface-hover)' }}
              >
                <ImageIcon size={24} style={{ color: 'var(--dash-text-muted)' }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium" style={{ color: 'var(--dash-text)' }}>
                  <span style={{ color: 'var(--dash-accent)' }}>Click to upload</span> or drag & drop
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--dash-text-faint)' }}>
                  PNG, JPG, WebP up to 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
