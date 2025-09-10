"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useProject } from "@/components/contexts/project-contexts"
import { ProgressBar } from "@/components/createProject/progressBar"

export default function ProjectDetailsPage() {
  const router = useRouter()
  const { state, dispatch, canProceedToStep } = useProject()
  const [formData, setFormData] = useState({
    ...state.projectDetails,
    fundingGoal: state.fundingGoal,
    duration: state.duration
  })

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
    dispatch({ type: "SET_PROJECT_DETAILS", details: { title: formData.title, description: formData.description } })
    dispatch({ type: "SET_FUNDING_GOAL", goal: formData.fundingGoal })
    dispatch({ type: "SET_DURATION", duration: formData.duration })
    if (formData.title.trim() && formData.description.trim() && formData.fundingGoal.trim() && formData.duration.trim()) {
      dispatch({ type: "SET_STEP", step: 3 })
      router.push("/createProject/rewards")
    }
  }

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.fundingGoal.trim() && formData.duration.trim()

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
            <h2 className="text-xl font-bold text-card-foreground mb-4">Project Details</h2>
            <p className="text-muted-foreground font-semibold mb-6">
              Tell us more about your project to help potential backers understand what you`re creating.
            </p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-black font-bold">
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
                <Label htmlFor="description" className="text-black font-bold">
                  Project Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="A brief description of my awesome project..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-2 min-h-32 bg-input border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground font-semibold mt-1">
                  Describe what makes your project special and why people should support it.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fundingGoal" className="text-black font-bold">
                    Funding Goal (SUI)
                  </Label>
                  <Input
                    id="fundingGoal"
                    type="number"
                    placeholder="1000"
                    value={formData.fundingGoal}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fundingGoal: e.target.value }))}
                    className="mt-2 bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground font-semibold mt-1">
                    Minimum amount needed to crowdfund your project.
                  </p>
                </div>

                <div>
                  <Label htmlFor="duration" className="text-black font-bold">
                    Campaign Duration (Days)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="30"
                    value={formData.duration}
                    onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                    className="mt-2 bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground font-semibold mt-1">
                    How long your campaign will run.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <Button onClick={handleBack} className="bg-green-300 text-black hover:bg-black hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!isFormValid}
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
