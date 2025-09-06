"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "../../../components/project-card";

// 🔹 Local mock projects (for design memory)
const mockProjects = [
  {
    id: "mock-1",
    name: "Mock Project One",
    imageUrl: "/images/image-1.jpg",
    funded: 50,
    daysLeft: 10,
    description: "This is a placeholder mock project.",
    creator: "0xMockUser...",
    goalAmount: 100000,
    raisedAmount: 50000,
  },
  {
    id: "mock-2",
    name: "Mock Project Two",
    imageUrl: "/images/image-2.jpg",
    funded: 30,
    daysLeft: 20,
    description: "Another mock placeholder project.",
    creator: "0xMockUser...",
    goalAmount: 200000,
    raisedAmount: 60000,
  },
];

export default function ProjectDiscoveryPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects");
        const chainProjects = await res.json();

        // 🔹 Always put chain projects first, then mock projects
        setProjects([...chainProjects, ...mockProjects]);
      } catch (err) {
        console.error("❌ Failed to load projects:", err);
        // Fallback → show just mock projects
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Discover Projects</h1>

      {loading && <p className="text-gray-500">Loading projects...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
