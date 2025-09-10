// "use client"

// import { cn } from "@/lib/utils"
// import { useState, useCallback } from "react"
// import { useDropzone } from "react-dropzone"
// import { Button } from "@/components/ui/button"
// import { Upload, X, ImageIcon, Video } from "lucide-react"

// interface FileUploadProps {
//   onFilesChange: (files: File[]) => void
//   acceptedTypes?: string
//   maxFiles?: number
// }

// export function FileUpload({ onFilesChange, acceptedTypes = "image/*,video/*", maxFiles = 10 }: FileUploadProps) {
//   const [files, setFiles] = useState<File[]>([])

//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
//       setFiles(newFiles)
//       onFilesChange(newFiles)
//     },
//     [files, maxFiles, onFilesChange],
//   )

//   const removeFile = (index: number) => {
//     const newFiles = files.filter((_, i) => i !== index)
//     setFiles(newFiles)
//     onFilesChange(newFiles)
//   }

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: acceptedTypes.split(",").reduce(
//       (acc, type) => {
//         acc[type.trim()] = []
//         return acc
//       },
//       {} as Record<string, string[]>,
//     ),
//     maxFiles: maxFiles - files.length,
//   })

//   const getFileIcon = (file: File) => {
//     if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
//     if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
//     return <ImageIcon className="h-4 w-4" />
//   }

//   return (
//     <div className="space-y-4">
//       <div
//         {...getRootProps()}
//         className={cn(
//           "border-2 border-dashed border-border rounded-lg p-8 mb-5 text-center cursor-pointer transition-colors",
//           isDragActive && "border-primary bg-primary/5",
//           files.length >= maxFiles && "opacity-50 cursor-not-allowed",
//         )}
//       >
//         <input {...getInputProps()} />
//         <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//         {isDragActive ? (
//           <p className="text-foreground">Drop the files here...</p>
//         ) : (
//           <div>
//             <p className="text-foreground mb-2">
//               <span className="font-medium">Click to upload</span> or drag and drop
//             </p>
//             <p className="text-sm text-muted-foreground">Images and videos up to 10MB each (max {maxFiles} files)</p>
//           </div>
//         )}
//       </div>

//       {files.length > 0 && (
//         <div className="space-y-2">
//           <h3 className="text-sm font-medium text-foreground">Uploaded Files</h3>
//           <div className="space-y-2">
//             {files.map((file, index) => (
//               <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   {getFileIcon(file)}
//                   <div>
//                     <p className="text-sm font-medium text-foreground">{file.name}</p>
//                     <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                   </div>
//                 </div>
//                 <Button
//                   size="sm"
//                   onClick={() => removeFile(index)}
//                   className="text-muted-foreground hover:text-destructive"
//                 >
//                   <X className="h-4 w-4 text-white" />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, FileText, Image, Video, CheckCircle, AlertCircle } from "lucide-react"
import { Input } from "../ui/input"

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  acceptedTypes?: string
  maxFiles?: number
  maxFileSize?: number // in MB
}

export function FileUpload({ 
  onFilesChange, 
  acceptedTypes = "image/*,video/*", 
  maxFiles = 10,
  maxFileSize = 50 
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

 const validateFile = useCallback((file: File): string | null => {
  if (file.size > maxFileSize * 1024 * 1024) {
    return `File "${file.name}" is too large. Maximum size is ${maxFileSize}MB.`
  }
  return null
}, [maxFileSize])


  const handleFiles = useCallback((newFiles: File[]) => {
    const validFiles: File[] = []
    const newErrors: string[] = []

    newFiles.forEach(file => {
      const error = validateFile(file)
      if (error) {
        newErrors.push(error)
      } else if (files.length + validFiles.length < maxFiles) {
        validFiles.push(file)
      } else {
        newErrors.push(`Maximum ${maxFiles} files allowed.`)
      }
    })

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles]
      setFiles(updatedFiles)
      onFilesChange(updatedFiles)

      // Simulate upload progress
      validFiles.forEach((file,) => {
        const fileName = file.name
        setUploadProgress(prev => ({ ...prev, [fileName]: 0 }))
        
        let progress = 0
        const interval = setInterval(() => {
          progress += Math.random() * 30
          if (progress >= 100) {
            progress = 100
            clearInterval(interval)
          }
          setUploadProgress(prev => ({ ...prev, [fileName]: progress }))
        }, 150)
      })
    }

    setErrors(newErrors)
  }, [files, maxFiles, onFilesChange, validateFile])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }, [handleFiles])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }, [handleFiles])

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
    
    const removedFile = files[index]
    setUploadProgress(prev => {
      const newProgress = { ...prev }
      delete newProgress[removedFile.name]
      return newProgress
    })
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image
    if (file.type.startsWith('video/')) return Video
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragOver
            ? 'border-blue-500 bg-blue-500/10 scale-[1.02]'
            : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
          animate={{ 
            background: isDragOver 
              ? "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
              : "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))"
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative p-12 text-center">
          <motion.div
            className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
              isDragOver 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                : 'bg-gradient-to-r from-gray-600 to-gray-700'
            }`}
            animate={{ 
              scale: isDragOver ? 1.1 : 1,
              rotate: isDragOver ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <Upload className={`w-8 h-8 ${isDragOver ? 'text-white' : 'text-gray-300'}`} />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ 
              color: isDragOver ? '#ffffff' : '#d1d5db'
            }}
          >
            <h3 className="text-xl font-semibold mb-2">
              {isDragOver ? 'Drop your files here!' : 'Upload your project files'}
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Drag and drop your files here, or click to browse. 
              Support for images, videos, and documents up to {maxFileSize}MB each.
            </p>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative overflow-hidden px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Choose Files</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* Error Messages */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {errors.map((error, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Uploaded Files ({files.length}/{maxFiles})
            </h4>
            
            <div className="space-y-2">
              {files.map((file, index) => {
                const FileIcon = getFileIcon(file)
                const progress = uploadProgress[file.name] || 100
                
                return (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileIcon className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className="text-white font-medium truncate">{file.name}</h5>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{formatFileSize(file.size)}</span>
                          {progress < 100 && (
                            <span>{Math.round(progress)}% uploaded</span>
                          )}
                          {progress === 100 && (
                            <span className="text-green-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Complete
                            </span>
                          )}
                        </div>
                      </div>

                      <motion.button
                        onClick={() => removeFile(index)}
                        className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Progress Bar */}
                    {progress < 100 && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}