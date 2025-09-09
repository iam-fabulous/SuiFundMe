'use client';

import React from 'react';
import { Button } from '../../../components/ui/button';

const handleConnectWallet = () => {
  console.log('Connect Wallet button clicked from Project Discovery Page');
};

export default function ProjectDiscoveryPage() {
  type Project = {
    id: string;
    name: string;
    imageUrl: string;
    funded: number;
    daysLeft: number;
    description: string;
    creator: string;
    goalAmount: number;
    raisedAmount: number;
  };

  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col text-white group/design-root overflow-x-hidden bg-gray-800">
        <main className="px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-7xl">
            <div className="p-4 space-y-6">
              <h1 className="text-xl font-bold text-center">Loading Projects...</h1>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex size-full min-h-screen flex-col text-white group/design-root overflow-x-hidden bg-gray-800">
        <main className="px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-7xl">
            <div className="p-4 space-y-6">
              <h1 className="text-xl font-bold text-center text-red-500">Error loading projects</h1>
              <p className="text-center text-gray-400">Please try again later.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col text-white group/design-root overflow-x-hidden bg-gray-800">
      <div className="layout-container flex h-full grow flex-col">
        <main className="px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-7xl">
            <div className="p-4 space-y-6 ">
              <label className="flex flex-col h-15 w-full border border-gray-700 rounded-full">
                <div className="relative flex w-full flex-1 items-stretch rounded-md h-12">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined text-2xl">search</span>
                  </div>
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-none  bg-gray-800 h-full placeholder:text-gray-400 pl-30 text-base font-normal leading-normal pr-5" placeholder="Search projects by keyword..." />
                </div>
              </label>
              <div className="flex items-center gap-3 p-3 flex-wrap">
                <span className="text-sm font-medium text-gray-400">Filter by:</span>
                <Button className="h-9 px-4 text-sm neon-blue-shadow transition-all duration-300 ease-in-out hover:bg-opacity-90">Tech</Button>
                <Button className="h-9 px-4 text-sm hover:bg-opacity-80 transition-colors">Music</Button>
                <Button className="h-9 px-4 text-sm hover:bg-opacity-80 transition-colors">Gaming</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
              {projects.map((project) => (
                <div key={project.id} className="flex flex-col gap-4 rounded-lg bg-gray-600 overflow-hidden group transition-transform duration-300 hover:-translate-y-1">
                  <img src={project.imageUrl} alt={project.name} className="w-full aspect-video object-cover" />
                  <div className="p-4 flex flex-col gap-3">
                    <h3 className="text-white text-base font-bold leading-snug">{project.name}</h3>
                    <div className="space-y-2">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full neon-blue-shadow" style={{ width: `${project.funded}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-blue-500">{project.funded}% Funded</span>
                        <span className="text-gray-400">{project.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
