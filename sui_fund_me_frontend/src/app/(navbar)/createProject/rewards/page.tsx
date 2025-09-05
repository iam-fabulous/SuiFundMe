"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Plus } from "lucide-react"
import { RewardTier } from "@/components/createProject/reward-tier"
import { ProgressBar } from "@/components/createProject/progressBar"
import { Header } from "@/components/createProject/createProject_header"
import { useProject, type RewardTier as RewardTierType } from "@/components/contexts/project-contexts"

export default function RewardTiersPage() {
  const router = useRouter()
  const { state, dispatch, canProceedToStep } = useProject()
  const [rewardTiers, setRewardTiers] = useState<RewardTierType[]>(state.rewardTiers)

  useEffect(() => {
    if (!canProceedToStep(3)) {
      router.push("/createProject/details")
      return
    }
    dispatch({ type: "SET_STEP", step: 3 })
  }, [canProceedToStep, dispatch, router])

  const handleBack = () => {
    dispatch({ type: "SET_STEP", step: 2 })
    router.push("/createProject/details")
  }

  const handleContinue = () => {
    dispatch({ type: "SET_REWARD_TIERS", tiers: rewardTiers })
    const validTiers = rewardTiers.filter((tier) => tier.title.trim() && tier.amount.trim() && tier.description.trim())

    if (validTiers.length > 0) {
      dispatch({ type: "SET_STEP", step: 4 })
      router.push("/createProject/review")
    }
  }

  const addRewardTier = () => {
    const newTier: RewardTierType = {
      id: Date.now().toString(),
      title: "",
      amount: "",
      description: "",
      isNFT: false,
      files: [],
    }
    setRewardTiers([...rewardTiers, newTier])
  }

  const updateRewardTier = (id: string, updates: Partial<RewardTierType>) => {
    setRewardTiers((tiers) => tiers.map((tier) => (tier.id === id ? { ...tier, ...updates } : tier)))
  }

  const removeRewardTier = (id: string) => {
    if (rewardTiers.length > 1) {
      setRewardTiers((tiers) => tiers.filter((tier) => tier.id !== id))
    }
  }

  const isFormValid = rewardTiers.some((tier) => tier.title.trim() && tier.amount.trim() && tier.description.trim())

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
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Reward Tiers</h2>
            <p className="text-muted-foreground mb-6">
              Create reward tiers to incentivize your backers. Each tier should offer something valuable in return for
              their support.
            </p>

            <div className="space-y-6">
              {rewardTiers.map((tier, index) => (
                <RewardTier
                  key={tier.id}
                  tier={tier}
                  index={index}
                  onUpdate={(updates) => updateRewardTier(tier.id, updates)}
                  onRemove={() => removeRewardTier(tier.id)}
                  canRemove={rewardTiers.length > 1}
                />
              ))}

              <Button
                variant="outline"
                onClick={addRewardTier}
                className="w-full border-dashed border-2 border-border hover:border-primary hover:bg-primary/5 bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Reward Tier
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack}>
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
