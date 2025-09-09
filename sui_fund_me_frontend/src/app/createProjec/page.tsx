"use client"

import { ArrowRight, Upload, Image, Video, FileText, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/createProject/fileUploads"
import { useProject } from "@/components/contexts/project-contexts"
import { ProgressBar } from "@/components/createProject/progressBar"

export default function CreateProjectPage() {
  const router = useRouter()
  const { state, dispatch } = useProject()

  const handleFilesChange = (files: File[]) => {
    dispatch({ type: "SET_FILES", files })
  }

  const handleContinue = () => {
    if (state.files.length > 0) {
      dispatch({ type: "SET_STEP", step: 2 })
      router.push("/createProject/details")
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,107,0,0.1),transparent_50%)]" />
        
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Create something amazing</span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Bring Your Vision to Life
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Launch your project on the blockchain and connect with supporters worldwide
          </motion.p>
        </motion.div>

        <ProgressBar currentStep={state.currentStep} totalSteps={4} />

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-white/10 shadow-2xl">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
            
            <div className="relative p-8">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Upload Project Media</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Start by showcasing your project with compelling visuals. Upload images, videos, or documents that tell your story and capture attention.
                </p>
              </motion.div>

              {/* File Type Examples */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {[
                  { icon: Image, type: 'Images', desc: 'JPG, PNG, GIF', color: 'from-green-500 to-emerald-500' },
                  { icon: Video, type: 'Videos', desc: 'MP4, MOV, AVI', color: 'from-blue-500 to-cyan-500' },
                  { icon: FileText, type: 'Documents', desc: 'PDF, DOC, TXT', color: 'from-purple-500 to-pink-500' }
                ].map((item, index) => (
                  <motion.div
                    key={item.type}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center group-hover:bg-white/10 transition-all duration-300">
                      <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">{item.type}</h3>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* File Upload Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <FileUpload onFilesChange={handleFilesChange} acceptedTypes="image/*,video/*" maxFiles={10} />
              </motion.div>

              {/* Uploaded Files Preview */}
              {state.files.length > 0 && (
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Uploaded Files ({state.files.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {state.files.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3 hover:bg-white/10 transition-all duration-300">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            {file.type.startsWith("video/") ? (
                              <Video className="w-4 h-4 text-white" />
                            ) : (
                              <Image className="w-4 h-4 text-white" aria-label="Image file" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-white truncate font-medium">{file.name}</p>
                            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <Button 
            disabled 
            className="bg-white/5 text-gray-500 cursor-not-allowed border border-white/10 hover:bg-white/5"
          >
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back
          </Button>

          <motion.div
            whileHover={{ scale: state.files.length > 0 ? 1.05 : 1 }}
            whileTap={{ scale: state.files.length > 0 ? 0.98 : 1 }}
          >
            <Button
              onClick={handleContinue}
              disabled={state.files.length === 0}
              className={`relative overflow-hidden font-bold transition-all duration-300 ${
                state.files.length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
            >
              {state.files.length > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              )}
              <span className="relative flex items-center gap-2">
                Continue to Details
                <motion.div
                  animate={state.files.length > 0 ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Help Text */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          <p className="text-sm text-gray-500">
            Need help? Check out our{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline transition-colors">
              project creation guide
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  )}