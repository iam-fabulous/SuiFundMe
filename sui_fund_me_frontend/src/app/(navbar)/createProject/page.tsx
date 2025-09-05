"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/createProject/fileUploads"
import { useProject } from "@/components/contexts/project-contexts"
import { ProgressBar } from "@/components/createProject/progressBar"
import { Header } from "@/components/createProject/createProject_header"

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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Project</h1>
          <p className="text-muted-foreground">Let`s get started on the basics.</p>
        </div>

        <ProgressBar currentStep={state.currentStep} totalSteps={4} />

        <div className="mt-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Upload Project Media</h2>
            <p className="text-muted-foreground mb-6">
              Add images or videos that showcase your project. These will help potential backers understand what you`re
              creating.
            </p>

            <FileUpload onFilesChange={handleFilesChange} acceptedTypes="image/*,video/*" maxFiles={10} />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" disabled>
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={state.files.length === 0}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Save & Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
