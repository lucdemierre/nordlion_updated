'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileText, Image, File, Check } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadedAt: Date
}

interface DocumentUploadProps {
  onUpload?: (files: UploadedFile[]) => void
  maxFiles?: number
  accept?: string
}

export default function DocumentUpload({
  onUpload,
  maxFiles = 10,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
}: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    setIsUploading(true)

    const newFiles: UploadedFile[] = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const uploadedFile: UploadedFile = {
        id: `${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      }

      newFiles.push(uploadedFile)
    }

    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles)
    setFiles(updatedFiles)
    setIsUploading(false)

    if (onUpload) {
      onUpload(updatedFiles)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleRemove = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id)
    setFiles(updatedFiles)
    if (onUpload) {
      onUpload(updatedFiles)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return Image
    if (type.includes('pdf')) return FileText
    return File
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#22c55e] bg-[#22c55e]/5'
            : 'border-white/10 hover:border-white/20 bg-[#0a0a0a]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
            <Upload size={24} className="text-[#22c55e]" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">
              {isUploading ? 'Uploading...' : 'Drop files here or click to browse'}
            </p>
            <p className="text-white/40 text-sm font-light">
              Supports PDF, DOC, DOCX, JPG, PNG (Max {maxFiles} files)
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-white/70 font-light">
            {files.length} {files.length === 1 ? 'file' : 'files'} uploaded
          </p>
          <div className="space-y-2">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type)
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-[#141414] border border-white/5 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                    <FileIcon size={20} className="text-[#22c55e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{file.name}</p>
                    <p className="text-xs text-white/40 font-light">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                    <button
                      onClick={() => handleRemove(file.id)}
                      className="w-6 h-6 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
                    >
                      <X size={14} className="text-white/60" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
