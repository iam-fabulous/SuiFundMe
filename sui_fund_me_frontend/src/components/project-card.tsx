"use client";

import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="flex flex-col gap-4 rounded-lg bg-gray-600 overflow-hidden group transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover"
          style={{ backgroundImage: `url("${project.imageUrl}")` }}
        ></div>
        <div className="p-4 flex flex-col gap-3">
          <h3 className="text-white text-base font-bold leading-snug">
            {project.name}
          </h3>
          <div className="space-y-2">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full neon-blue-shadow"
                style={{ width: `${project.funded}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-blue-500">{project.funded}% Funded</span>
              <span className="text-gray-400">{project.daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
