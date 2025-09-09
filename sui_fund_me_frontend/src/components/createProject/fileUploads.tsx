"use client"

import { cn } from "@/lib/utils"
import { useDropzone } from "react-dropzone"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon, Video } from "lucide-react"

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  acceptedTypes?: string
  maxFiles?: number
  allowMultiple?: boolean
}

export function FileUpload({
  onFilesChange,
  acceptedTypes = "image/*,video/*",
  maxFiles = 1,
  allowMultiple = false
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let newFiles: File[]

      if (!allowMultiple) {
        newFiles = acceptedFiles.slice(0, 1)
      } else {
        newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
      }

      setFiles(newFiles)
      onFilesChange(newFiles)
    },
    [files, maxFiles, allowMultiple, onFilesChange],
  )

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.split(",").reduce(
      (acc, type) => {
        acc[type.trim()] = []
        return acc
      },
      {} as Record<string, string[]>,
    ),
    maxFiles: maxFiles - files.length,
  })

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-10 w-10" />
    if (file.type.startsWith("video/")) return <Video className="h-10 w-10" />
    return <ImageIcon className="h-15 w-15" />
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed border-border rounded-lg p-8 mb-5 text-center cursor-pointer transition-colors",
          isDragActive && "border-primary bg-primary/5",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed",
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-foreground">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-foreground mb-2">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-muted-foreground">
              {allowMultiple
                ? `Images and videos up to 10MB each (max ${maxFiles} files)`
                : "Upload one image or video up to 10MB"
              }
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">Uploaded Files</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
