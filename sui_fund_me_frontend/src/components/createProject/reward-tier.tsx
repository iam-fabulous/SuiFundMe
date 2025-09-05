"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FileUpload } from "@/components/createProject/fileUploads"
import { Trash2, Edit3, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface RewardTierData {
  id: string
  title: string
  amount: string
  description: string
  isNFT: boolean
  files: File[]
}

interface RewardTierProps {
  tier: RewardTierData
  index: number
  onUpdate: (updates: Partial<RewardTierData>) => void
  onRemove: () => void
  canRemove: boolean
}

export function RewardTier({ tier, index, onUpdate, onRemove, canRemove }: RewardTierProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleToggleNFT = (checked: boolean) => {
    onUpdate({ isNFT: checked })
  }

  const handleFilesChange = (files: File[]) => {
    onUpdate({ files })
  }

  return (
    <div
      className={cn("border border-border rounded-lg p-6 transition-all", tier.isNFT && "border-primary bg-primary/5")}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">{tier.title || `Reward Tier ${index + 1}`}</h3>
          {tier.isNFT && <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">NFT</span>}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Check className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          </Button>
          {canRemove && (
            <Button variant="ghost" size="sm" onClick={onRemove} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor={`amount-${tier.id}`} className="text-foreground">
            Reward Amount
          </Label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id={`amount-${tier.id}`}
              type="number"
              placeholder="50"
              value={tier.amount}
              onChange={(e) => onUpdate({ amount: e.target.value })}
              className="pl-8 bg-input border-border text-foreground"
            />
          </div>
        </div>

        <div>
          <Label htmlFor={`title-${tier.id}`} className="text-foreground">
            Reward Title
          </Label>
          <Input
            id={`title-${tier.id}`}
            placeholder="e.g. Early Bird Access"
            value={tier.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="mt-2 bg-input border-border text-foreground"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor={`description-${tier.id}`} className="text-foreground">
          Description
        </Label>
        <Textarea
          id={`description-${tier.id}`}
          placeholder="Describe the tier and what backers will receive..."
          value={tier.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          className="mt-2 min-h-24 bg-input border-border text-foreground"
        />
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <Switch id={`nft-${tier.id}`} checked={tier.isNFT} onCheckedChange={handleToggleNFT} />
        <Label htmlFor={`nft-${tier.id}`} className="text-foreground">
          This reward is an NFT
        </Label>
      </div>

      {tier.isNFT && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">NFT Asset</h4>
          <FileUpload onFilesChange={handleFilesChange} acceptedTypes="image/*" maxFiles={1} />
          <p className="text-xs text-muted-foreground mt-2">
            Upload the digital asset that will be minted as an NFT for this reward tier.
          </p>
        </div>
      )}
    </div>
  )
}
