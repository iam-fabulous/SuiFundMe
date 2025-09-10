"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode, useCallback } from "react"

export interface RewardTier {
  id: string
  title: string
  amount: string
  description: string
  isNFT: boolean
  files: File[]
}

export interface ProjectState {
  currentStep: number
  files: File[]
  projectDetails: {
    title: string
    description: string
  }
  fundingGoal: string
  duration: string 
  rewardTiers: RewardTier[]
  isComplete: boolean
}

type ProjectAction =
  | { type: "SET_STEP"; step: number }
  | { type: "SET_FILES"; files: File[] }
  | { type: "SET_PROJECT_DETAILS"; details: { title: string; description: string } }
  | { type: "SET_FUNDING_GOAL"; goal: string }
  | { type: "SET_DURATION"; duration: string }
  | { type: "SET_REWARD_TIERS"; tiers: RewardTier[] }
  | { type: "RESET_PROJECT" }
  | { type: "COMPLETE_PROJECT" }

const initialState: ProjectState = {
  currentStep: 1,
  files: [],
  projectDetails: {
    title: "",
    description: "",
  },
  fundingGoal: "",
  duration: "",
  rewardTiers: [
    {
      id: "1",
      title: "Supporter Tier",
      amount: "10",
      description: "",
      isNFT: false,
      files: [],
    },
  ],
  isComplete: false,
}

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step }
    case "SET_FILES":
      return { ...state, files: action.files }
    case "SET_PROJECT_DETAILS":
      return { ...state, projectDetails: action.details }
    case "SET_FUNDING_GOAL":
      return { ...state, fundingGoal: action.goal }
    case "SET_DURATION":
      return { ...state, duration: action.duration }
    case "SET_REWARD_TIERS":
      return { ...state, rewardTiers: action.tiers }
    case "COMPLETE_PROJECT":
      return { ...state, isComplete: true }
    case "RESET_PROJECT":
      return initialState
    default:
      return state
  }
}

const ProjectContext = createContext<{
  state: ProjectState
  dispatch: React.Dispatch<ProjectAction>
  canProceedToStep: (step: number) => boolean
  isStepComplete: (step: number) => boolean
} | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  const isStepComplete = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1:
          return state.files.length === 1
        case 2:
          return state.projectDetails.title.trim() !== "" &&
                 state.projectDetails.description.trim() !== "" &&
                 state.fundingGoal.trim() !== "" &&
                 state.duration.trim() !== ""
        case 3:
          return state.rewardTiers.some(
            (tier) => tier.title.trim() !== "" && tier.amount.trim() !== "" && tier.description.trim() !== "",
          )
        case 4:
          return (
            state.files.length === 1 && // Ensure exactly one file
            state.projectDetails.title.trim() !== "" &&
            state.projectDetails.description.trim() !== "" &&
            state.fundingGoal.trim() !== "" &&
            state.duration.trim() !== "" &&
            state.rewardTiers.some(
              (tier) => tier.title.trim() !== "" && tier.amount.trim() !== "" && tier.description.trim() !== "",
            )
          )
        default:
          return false
      }
    },
    [state.files.length, state.projectDetails.title, state.projectDetails.description, state.fundingGoal, state.duration, state.rewardTiers],
  )

  const canProceedToStep = useCallback(
    (step: number): boolean => {
      if (step <= 1) return true
      return isStepComplete(step - 1)
    },
    [isStepComplete],
  )

  return (
    <ProjectContext.Provider value={{ state, dispatch, canProceedToStep, isStepComplete }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider")
  }
  return context
}
