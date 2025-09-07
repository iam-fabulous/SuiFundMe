'use client';

import { Button } from '@/components/ui/button';
// The original import for 'next/link' has been removed as it caused a compilation error.
// We are now using standard <a> tags for navigation.

// NOTE: This is a placeholder function. You will need to replace this with
// actual wallet connection logic using a library like @mysten/sui.
const handleConnectWallet = () => {
  console.log('Connect Wallet button clicked from Project Discovery Page');
  // TODO: Add real wallet connection logic here, e.g.,
  // const wallet = getWalletProvider();
  // wallet.connect();
};

export default function ProjectDiscoveryPage() {
  // NOTE: This array is a hardcoded mockup. In a real application, you would
  // fetch this data from an API or a database (like Firestore) and then map
  // over it to render the projects dynamically.
  const projects = [
    {
      id: 1,
      name: 'EcoTech Solutions: Sustainable Energy for All',
      imageUrl: '/images/project-1.jpg',
      funded: 75,
      daysLeft: 25,
    },
    {
      id: 2,
      name: 'Harmonia: A Symphony of Unity',
      imageUrl: '/images/project-2.jpg',
      funded: 60,
      daysLeft: 15,
    },
    {
      id: 3,
      name: 'PixelQuest: The RPG Revolution',
      imageUrl: '/images/project-3.jpg',
      funded: 90,
      daysLeft: 30,
    },
  ];

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
                {/* NOTE: The 'neon-blue-shadow' class is a custom class. It must be defined in your global CSS file for styling to apply. */}
                <Button className="h-9 px-4 text-sm neon-blue-shadow transition-all duration-300 ease-in-out hover:bg-opacity-90">Tech</Button>
                <Button className="h-9 px-4 text-sm hover:bg-opacity-80 transition-colors">Music</Button>
                <Button className="h-9 px-4 text-sm hover:bg-opacity-80 transition-colors">Gaming</Button>
              </div>
            </div>
            {/* NOTE: This section is hardcoded. It would be much more dynamic and scalable to map over the 'projects' array. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
              {projects.map((project) => (
                <div key={project.id} className="flex flex-col gap-4 rounded-lg bg-gray-600 overflow-hidden group transition-transform duration-300 hover:-translate-y-1">
                  {/* NOTE: Using inline style for the background image is functional, but
                  ensure the images exist in your public directory.
                  A better approach would be to use a component and pass the image URL as a prop. */}
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: `url("${project.imageUrl}")` }}></div>
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