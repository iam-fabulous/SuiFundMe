"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
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
    if (state.files.length === 1) {
      dispatch({ type: "SET_STEP", step: 2 })
      router.push("/createProject/details")
    }
  }

  return (
    <div className="relative size-full min-h-screen overflow-x-hidden">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="absolute inset-0 -z-10">
          <div className="bg-[url('/images/image-2.png')] bg-cover bg-center bg-no-repeat absolute inset-0 size-full"></div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="mb-8 mt-20">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Project</h1>
          <p className="text-white">Let`s get started on the basics.</p>
        </div>

        <ProgressBar currentStep={state.currentStep} totalSteps={4} />

        <div className="mt-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Upload Project Media</h2>
            <p className="text-muted-foreground mb-6">
              Add one image or video that showcases your project. This will help potential backers understand what you're
              creating.
            </p>

            <FileUpload onFilesChange={handleFilesChange} acceptedTypes="image/*,video/*" allowMultiple={false} />
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <Button disabled className="bg-green-300 text-black hover:bg-black hover:text-white">
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={state.files.length !== 1}
            className="bg-blue-600 hover:bg-primary/90 text-white font-semibold"
          >
            Save & Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
