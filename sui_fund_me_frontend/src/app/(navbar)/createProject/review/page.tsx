"use client"

export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useProject } from "@/components/contexts/project-contexts"
import { ProgressBar } from "@/components/createProject/progressBar"
import { getPrimaryImageBlobId } from "@/utils/walrus"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit"
import { ArrowLeft, CheckCircle, ImageIcon, Video, Loader2, AlertCircle } from "lucide-react"
import { createCampaignTransaction, stringToBytes, stringsToBytes, suiToMist, daysToMilliseconds } from "@/utils/blockchain"

export default function ReviewPage() {
  const router = useRouter()
  const account = useCurrentAccount()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const { state, dispatch, canProceedToStep } = useProject()
  const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!canProceedToStep(4) && isHydrated) {
      router.push("/createProject/rewards")
      return
    }
    if (isHydrated) {
      dispatch({ type: "SET_STEP", step: 4 })
    }
  }, [canProceedToStep, dispatch, router, isHydrated])

  const handleBack = () => {
    dispatch({ type: "SET_STEP", step: 3 })
    router.push("/createProject/rewards")
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Preparing media files for Walrus upload...")
      const userAccount = account?.address || ""
      if (!userAccount) {
        throw new Error("Wallet not connected")
      }

      const selectedFile = state.files[0]
      if (!selectedFile) {
        throw new Error("No file selected")
      }

      const { uploadSingleFileToWalrus } = await import("@/utils/walrus");
      const { blobId, transaction } = await uploadSingleFileToWalrus(selectedFile, userAccount)

      console.log("Executing Walrus registration transaction...")
      await signAndExecuteTransaction({ transaction })

      const mediaBlobId = blobId

      const goal = suiToMist(state.fundingGoal)
      const durationMs = daysToMilliseconds(state.duration)
      const descriptionBytes = stringToBytes(state.projectDetails.description)
      const mediaBlobIdBytes = stringToBytes(mediaBlobId)

      const tierNames = state.rewardTiers.map(tier => tier.title)
      const tierNamesBytes = stringsToBytes(tierNames)
      const tierMinAmounts = state.rewardTiers.map(tier => suiToMist(tier.amount))
      const tierDescriptions = state.rewardTiers.map(tier => tier.description)
      const tierDescriptionsBytes = stringsToBytes(tierDescriptions)

      console.log("Creating smart contract transaction...")
      const tx = await createCampaignTransaction({
        goal,
        durationMs,
        descriptionBytes,
        mediaBlobIdBytes,
        tierNames: tierNamesBytes,
        tierMinAmounts,
        tierDescriptions: tierDescriptionsBytes,
      })

      console.log("Executing transaction...")
      const result = await signAndExecuteTransaction({ transaction: tx })

      console.log("Transaction successful:", result)

      dispatch({ type: "COMPLETE_PROJECT" })
      dispatch({ type: "RESET_PROJECT" })

      router.push("/marketplace")

    } catch (err) {
      console.error("Campaign creation failed:", err)
      setError(err instanceof Error ? err.message : "Failed to create campaign")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative size-full min-h-screen overflow-x-hidden">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="absolute inset-0 -z-10">
          <div className="bg-[url('/images/image-2.png')] bg-cover bg-center bg-no-repeat absolute inset-0 size-full"></div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="mb-8 mt-10">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Project</h1>
          <p className="text-white">Review your project before publishing.</p>
        </div>

        <ProgressBar currentStep={state.currentStep} totalSteps={4} />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Project Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-foreground mb-2">{state.projectDetails.title}</h3>
              <p className="text-muted-foreground">{state.projectDetails.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Funding Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Funding Goal</h4>
                  <p className="text-lg font-semibold text-primary">{state.fundingGoal} SUI</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Campaign Duration</h4>
                  <p className="text-lg font-semibold">{state.duration} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Project Media</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {state.files.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    {file.type.startsWith("video/") ? (
                      <Video className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm text-foreground truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Reward Tiers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.rewardTiers.map((tier, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{tier.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">${tier.amount}</span>
                        {tier.isNFT && (
                          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">NFT</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-10 mb-20">
          <Button onClick={handleBack} className="bg-green-300 text-black hover:bg-black hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-primary/90 text-white font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Campaign...
              </>
            ) : (
              "Publish Project"
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
