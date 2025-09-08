"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChainProject, fetchProjectById, pledgeToProject } from "../../../lib/sui";
import Image from "next/image";
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';



// type ProjectApiResponse = ChainProject | { error: string };
export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const [project, setProject] = useState<ChainProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [pledging, setPledging] = useState(false);

  // ✅ hook gives you the signer function
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

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


  async function handlePledge() {
  try {
    setPledging(true); // start loading
    await pledgeToProject(projectId, 10, signAndExecuteTransaction);
  } catch (err) {
    console.error("Pledge failed:", err);
    alert("Failed to pledge. Please try again.");
  } finally {
    setPledging(false); // stop loading
  }
}

  if (loading) return <p className="p-6 text-gray-400">Loading project...</p>;
  if (!project) return <p className="p-6 text-red-500">Project not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <Image
        src={project.imageUrl}
        alt={project.name}
        width={800}
        height={400}
        className="w-full rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-300 mb-4">{project.description}</p>

      <div className="mb-4">
        <p>
          <span className="font-semibold">Creator:</span> {project.creator}
        </p>
        <p>
          <span className="font-semibold">Goal:</span> {project.goalAmount}
        </p>
        <p>
          <span className="font-semibold">Raised:</span> {project.raisedAmount}
        </p>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
        <div
          className="bg-blue-500 h-3 rounded-full"
          style={{ width: `${project.funded}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-400 mb-6">
        {project.funded}% funded — {project.daysLeft} days left
      </p>

      {/* Support Button */}
      <button
        onClick={handlePledge}
        disabled={pledging}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow-md transition disabled:opacity-50"
      >
        {pledging ? "Pledging..." : "Support this Project"}
      </button>
    </div>
  );
}
