// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { ChainProject, fetchProjectById, pledgeToProject } from "../../../lib/sui";
// import Image from "next/image";
// import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';



// // type ProjectApiResponse = ChainProject | { error: string };
// export default function ProjectDetailPage() {
//   const params = useParams();
//   const projectId = params?.id as string;

//   const [project, setProject] = useState<ChainProject | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [pledging, setPledging] = useState(false);

//   // ✅ hook gives you the signer function
//   const { mutateAsync: signAndExecuteTransaction } =
//     useSignAndExecuteTransaction();

//    useEffect(() => {
//     async function loadProject() {
//       try {
//         setLoading(true);
//         const data = await fetchProjectById(projectId);
//         setProject(data);
//       } catch (err) {
//         console.error("Failed to load project detail:", err);
//         setProject(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (projectId) loadProject();
//   }, [projectId]);


//   async function handlePledge() {
//   try {
//     setPledging(true); // start loading
//     await pledgeToProject(projectId, 10, signAndExecuteTransaction);
//   } catch (err) {
//     console.error("Pledge failed:", err);
//     alert("Failed to pledge. Please try again.");
//   } finally {
//     setPledging(false); // stop loading
//   }
// }

//   if (loading) return <p className="p-6 text-gray-400">Loading project...</p>;
//   if (!project) return <p className="p-6 text-red-500">Project not found.</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto text-white">
//       <Image
//         src={project.imageUrl}
//         alt={project.name}
//         width={800}
//         height={400}
//         className="w-full rounded-lg mb-6"
//       />
//       <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
//       <p className="text-gray-300 mb-4">{project.description}</p>

//       <div className="mb-4">
//         <p>
//           <span className="font-semibold">Creator:</span> {project.creator}
//         </p>
//         <p>
//           <span className="font-semibold">Goal:</span> {project.goalAmount}
//         </p>
//         <p>
//           <span className="font-semibold">Raised:</span> {project.raisedAmount}
//         </p>
//       </div>

//       <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
//         <div
//           className="bg-blue-500 h-3 rounded-full"
//           style={{ width: `${project.funded}%` }}
//         ></div>
//       </div>
//       <p className="text-sm text-gray-400 mb-6">
//         {project.funded}% funded — {project.daysLeft} days left
//       </p>

//       {/* Support Button */}
//       <button
//         onClick={handlePledge}
//         disabled={pledging}
//         className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow-md transition disabled:opacity-50"
//       >
//         {pledging ? "Pledging..." : "Support this Project"}
//       </button>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Users, Clock, Target, Award, } from 'lucide-react';

export type Tier = {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  description: string;
  rewards: string[];
  maxBackers?: number;
  currentBackers: number;
  nftDetails: {
    name: string;
    description: string;
    imageUrl: string;
    attributes: { trait_type: string; value: string }[];
  };
};

export type ChainProject = {
  id: string;
  name: string;
  imageUrl: string;
  funded: number;
  daysLeft: number;
  description: string;
  creator: string;
  goalAmount: number;
  raisedAmount: number;
  tiers: Tier[];
  category?: string;
  longDescription?: string;
};

async function fetchProjectById(projectId: string): Promise<ChainProject> {

  return {
    id: projectId,
    name: "Ocean Cleanup Initiative",
    imageUrl: "/images/ocean-cleanup.jpg",
    funded: 45,
    daysLeft: 18,
    description: "Blockchain-verified ocean cleanup operations with real-time impact tracking.",
    longDescription: "Our revolutionary ocean cleanup initiative leverages blockchain technology to create transparent, verifiable impact tracking. Every cleanup operation is recorded on-chain, ensuring complete accountability and allowing supporters to see exactly how their contributions are making a difference. Join us in creating a cleaner, more sustainable ocean ecosystem for future generations.",
    creator: "0xOceanDAO...",
    goalAmount: 200000,
    raisedAmount: 90000,
    category: "Environment",
    tiers: [
      {
        id: "tier-1",
        name: "Ocean Supporter",
        minAmount: 10,
        maxAmount: 49,
        description: "Join the movement and make your first impact",
        rewards: ["Digital Certificate", "Monthly Progress Updates", "Community Access"],
        maxBackers: 1000,
        currentBackers: 234,
        nftDetails: {
          name: "Ocean Supporter Badge",
          description: "Your first step in ocean conservation",
          imageUrl: "/nft/supporter-badge.png",
          attributes: [
            { trait_type: "Tier", value: "Supporter" },
            { trait_type: "Impact Level", value: "Basic" },
            { trait_type: "Rarity", value: "Common" }
          ]
        }
      },
      {
        id: "tier-2",
        name: "Wave Guardian",
        minAmount: 50,
        maxAmount: 199,
        description: "Become a guardian of ocean waves and marine life",
        rewards: ["Exclusive NFT", "Quarterly Impact Reports", "Early Project Updates", "Community Discord Access"],
        maxBackers: 500,
        currentBackers: 89,
        nftDetails: {
          name: "Wave Guardian NFT",
          description: "Guardian of ocean waves and protector of marine ecosystems",
          imageUrl: "/nft/wave-guardian.png",
          attributes: [
            { trait_type: "Tier", value: "Guardian" },
            { trait_type: "Impact Level", value: "Medium" },
            { trait_type: "Rarity", value: "Uncommon" }
          ]
        }
      },
      {
        id: "tier-3",
        name: "Ocean Champion",
        minAmount: 200,
        maxAmount: 999,
        description: "Champion the cause with significant impact",
        rewards: ["Premium Animated NFT", "Cleanup Location Naming Rights", "Video Call with Team", "Physical Certificate"],
        maxBackers: 100,
        currentBackers: 23,
        nftDetails: {
          name: "Ocean Champion Trophy",
          description: "Elite champion of ocean conservation with naming rights",
          imageUrl: "/nft/ocean-champion.png",
          attributes: [
            { trait_type: "Tier", value: "Champion" },
            { trait_type: "Impact Level", value: "High" },
            { trait_type: "Rarity", value: "Rare" }
          ]
        }
      },
      {
        id: "tier-4",
        name: "Ocean Legend",
        minAmount: 1000,
        maxAmount: 10000,
        description: "Become a legendary figure in ocean conservation",
        rewards: ["Ultra-Rare Animated NFT", "Co-founder Status", "Strategic Advisory Role", "Custom Cleanup Mission"],
        maxBackers: 10,
        currentBackers: 2,
        nftDetails: {
          name: "Ocean Legend Crown",
          description: "Legendary status in ocean conservation history",
          imageUrl: "/nft/ocean-legend.png",
          attributes: [
            { trait_type: "Tier", value: "Legend" },
            { trait_type: "Impact Level", value: "Legendary" },
            { trait_type: "Rarity", value: "Mythic" }
          ]
        }
      }
    ]
  };
}

async function pledgeToProject(
  projectId: string, 
  tierId: string, 
  amount: number, 
  walletAddress: string, 
): Promise<void> {
  console.log("Pledging:", { projectId, tierId, amount, walletAddress });
  await new Promise(resolve => setTimeout(resolve, 2000));
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;
  const currentAccount = useCurrentAccount();

  const [project, setProject] = useState<ChainProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<number>(0);
  const [pledging, setPledging] = useState(false);
  const [showPledgeModal, setShowPledgeModal] = useState(false);

  // const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        const data = await fetchProjectById(projectId);
        setProject(data);
      } catch (err) {
        console.error("Failed to load project detail:", err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) loadProject();
  }, [projectId]);

  const handleTierSelect = (tier: Tier) => {
    setSelectedTier(tier);
    setPledgeAmount(tier.minAmount);
    setShowPledgeModal(true);
  };

  const handlePledge = async () => {
    if (!currentAccount || !selectedTier || !project) {
      alert("Please connect your wallet first");
      return;
    }

    if (pledgeAmount < selectedTier.minAmount || pledgeAmount > selectedTier.maxAmount) {
      alert(`Amount must be between ${selectedTier.minAmount} and ${selectedTier.maxAmount}`);
      return;
    }

    try {
      setPledging(true);
      await pledgeToProject(
        projectId,
        selectedTier.id,
        pledgeAmount,
        currentAccount.address,
      );
      
      alert(`Successfully pledged ${pledgeAmount}! Your NFT will be sent when the project goal is met.`);
      router.push('/explore');
    } catch (err) {
      console.error("Pledge failed:", err);
      alert("Failed to pledge. Please try again.");
    } finally {
      setPledging(false);
      setShowPledgeModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Project not found</h2>
          <button
            onClick={() => router.push('/explore')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="streaks" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(45)">
              <rect width="2" height="100" fill="url(#streakGrad)" opacity="0.1">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite"/>
              </rect>
            </pattern>
            <linearGradient id="streakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9"/>
              <stop offset="50%" stopColor="#06b6d4"/>
              <stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#streaks)"/>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="p-6">
          <Button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-blue-200 hover:text-cyan-400 transition-colors mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Projects</span>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="relative">
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-cyan-400 font-semibold">{project.category}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
                <p className="text-blue-200 text-lg">{project.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-blue-900/30">
                  <Target className="text-cyan-400 mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{project.funded}%</div>
                  <div className="text-sm text-blue-200">Funded</div>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-blue-900/30">
                  <Clock className="text-cyan-400 mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">{project.daysLeft}</div>
                  <div className="text-sm text-blue-200">Days Left</div>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-blue-900/30">
                  <Users className="text-cyan-400 mb-2" size={24} />
                  <div className="text-2xl font-bold text-white">
                    {project.tiers.reduce((sum, tier) => sum + tier.currentBackers, 0)}
                  </div>
                  <div className="text-sm text-blue-200">Backers</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-blue-200 mb-2">
                  <span>${project.raisedAmount.toLocaleString()} raised</span>
                  <span>Goal: ${project.goalAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(project.funded, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-blue-900/30">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {project.creator.slice(2, 4).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Created by</div>
                  <div className="text-white font-mono text-sm">{project.creator}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {project.longDescription && (
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
              <p className="text-blue-200 leading-relaxed">{project.longDescription}</p>
            </div>
          </div>
        )}

        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Choose Your Impact Level</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-900/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onClick={() => handleTierSelect(tier)}
                >
                  <div className="relative mb-4">
                    <Image
                      src={tier.nftDetails.imageUrl}
                      alt={tier.nftDetails.name}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Award className="text-cyan-400" size={16} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-cyan-400 font-bold text-lg mb-3">
                    ${tier.minAmount} - ${tier.maxAmount}
                  </div>
                  <p className="text-blue-200 text-sm mb-4">{tier.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Rewards Include:</h4>
                    <ul className="space-y-1">
                      {tier.rewards.slice(0, 3).map((reward, index) => (
                        <li key={index} className="text-xs text-blue-200 flex items-start space-x-1">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{reward}</span>
                        </li>
                      ))}
                      {tier.rewards.length > 3 && (
                        <li className="text-xs text-blue-300">+{tier.rewards.length - 3} more...</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center text-xs text-blue-300">
                    <span>{tier.currentBackers} backers</span>
                    {tier.maxBackers && (
                      <span>{tier.maxBackers - tier.currentBackers} left</span>
                    )}
                  </div>

                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-semibold">
                      Select This Tier
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showPledgeModal && selectedTier && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-blue-900/50">
              <h3 className="text-2xl font-bold text-white mb-4">{selectedTier.name}</h3>
              
              <div className="mb-4">
                <Image
                  src={selectedTier.nftDetails.imageUrl}
                  alt={selectedTier.nftDetails.name}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-sm text-blue-200">{selectedTier.nftDetails.description}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Pledge Amount (${selectedTier.minAmount} - ${selectedTier.maxAmount})
                </label>
                <Input
                  type="number"
                  min={selectedTier.minAmount}
                  max={selectedTier.maxAmount}
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-blue-900/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="mb-4 p-3 bg-black/30 rounded-lg">
                <div className="text-xs text-blue-300">NFT will be sent to:</div>
                <div className="text-sm font-mono text-white truncate">
                  {currentAccount?.address || "Not connected"}
                </div>
              </div>

              <div className="text-xs text-blue-300 mb-6">
                * NFT rewards will be distributed when the project reaches its funding goal
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowPledgeModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  disabled={pledging}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePledge}
                  disabled={pledging || !currentAccount}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  {pledging ? "Processing..." : `Pledge $${pledgeAmount}`}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
