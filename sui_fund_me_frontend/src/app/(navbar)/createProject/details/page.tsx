"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/createProject/createProject_header"
import { ProgressBar } from "@/components/createProject/progressBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useProject } from "@/components/contexts/project-contexts"

export default function ProjectDetailsPage() {
  const router = useRouter()
  const { state, dispatch, canProceedToStep } = useProject()
  const [formData, setFormData] = useState(state.projectDetails)

  useEffect(() => {
    if (!canProceedToStep(2)) {
      router.push("/")
      return
    }
    dispatch({ type: "SET_STEP", step: 2 })
  }, [canProceedToStep, dispatch, router])

  const handleBack = () => {
    dispatch({ type: "SET_STEP", step: 1 })
    router.push("/createProject")
  }

  const handleContinue = () => {
    dispatch({ type: "SET_PROJECT_DETAILS", details: formData })
    if (formData.title.trim() && formData.description.trim()) {
      dispatch({ type: "SET_STEP", step: 3 })
      router.push("/createProject/rewards")
    }
  }

  const isFormValid = formData.title.trim() && formData.description.trim()

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
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Project Details</h2>
            <p className="text-muted-foreground mb-6">
              Tell us more about your project to help potential backers understand what you`re creating.
            </p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-foreground">
                  Project Title
                </Label>
                <Input
                  id="title"
                  placeholder="My Awesome Project"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="mt-2 bg-input border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-foreground">
                  Project Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="A brief description of my awesome project..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-2 min-h-32 bg-input border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Describe what makes your project special and why people should support it.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!isFormValid}
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
