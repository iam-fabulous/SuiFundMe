"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("❌ Failed to load project detail:", err);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) loadProject();
  }, [projectId]);

  if (loading) return <p className="p-6 text-gray-400">Loading project...</p>;
  if (!project) return <p className="p-6 text-red-500">Project not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <img
        src={project.imageUrl}
        alt={project.name}
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
      <p className="text-sm text-gray-400">
        {project.funded}% funded — {project.daysLeft} days left
      </p>
    </div>
  );
}
