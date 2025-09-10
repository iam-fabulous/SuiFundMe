// "use client";

// import React, { useEffect, useState } from "react";
// import ProjectCard from "../../../components/project-card";

// interface Project {
//   id: string;
//   name: string;
//   imageUrl: string;
//   funded: number;
//   daysLeft: number;
//   description: string;
//   creator: string;
//   goalAmount: number;
//   raisedAmount: number;
// }

// // 🔹 Local mock projects (for design memory)
// const mockProjects: Project[] = [
//   {
//     id: "mock-1",
//     name: "Mock Project One",
//     imageUrl: "/images/image-1.png",
//     funded: 50,
//     daysLeft: 10,
//     description: "This is a placeholder mock project.",
//     creator: "0xMockUser...",
//     goalAmount: 100000,
//     raisedAmount: 50000,
//   },
//   {
//     id: "mock-2",
//     name: "Mock Project Two",
//     imageUrl: "/images/image-2.png",
//     funded: 30,
//     daysLeft: 20,
//     description: "Another mock placeholder project.",
//     creator: "0xMockUser...",
//     goalAmount: 200000,
//     raisedAmount: 60000,
//   },
// ];

// export default function ProjectDiscoveryPage() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadProjects() {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/projects");
//         const chainProjects = await res.json();

//         // 🔹 Always put chain projects first, then mock projects
//         setProjects([...chainProjects, ...mockProjects]);
//       } catch (err) {
//         console.error("❌ Failed to load projects:", err);
//         // Fallback → show just mock projects
//         setProjects(mockProjects);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProjects();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-800">
//       <h1 className="text-2xl font-bold mb-6 text-white">Discover Projects</h1>

//       {loading && <p className="text-gray-500">Loading projects...</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
//         {projects.map((project) => (
//           <ProjectCard key={project.id} project={project} />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Search, TrendingUp, Clock, Target, Zap, Users, Globe } from "lucide-react";




interface Project {
  id: string;
  name: string;
  imageUrl: string;
  funded: number;
  daysLeft: number;
  description: string;
  creator: string;
  goalAmount: number;
  raisedAmount: number;
}

const mockProjects: Project[] = [
  {
    id: "mock-1",
    name: "EcoTech Solutions: Solar Power Revolution",
    imageUrl: "/images/image-1.png",
    funded: 75,
    daysLeft: 10,
    description: "Building affordable solar energy solutions for remote communities worldwide.",
    creator: "0xEcoTech...",
    goalAmount: 150000,
    raisedAmount: 112500,
  },
  {
    id: "mock-2", 
    name: "GameFi Arena: Next-Gen Gaming Platform",
    imageUrl: "/images/image-2.png",
    funded: 30,
    daysLeft: 25,
    description: "Decentralized gaming platform with play-to-earn mechanics and NFT rewards.",
    creator: "0xGameDev...",
    goalAmount: 500000,
    raisedAmount: 150000,
  },
  {
    id: "mock-3",
    name: "DeFi Education Hub",
    imageUrl: "/images/image-1.png",
    funded: 90,
    daysLeft: 5,
    description: "Comprehensive DeFi education platform for Web3 newcomers.",
    creator: "0xEducator...",
    goalAmount: 75000,
    raisedAmount: 67500,
  },
  {
    id: "mock-4",
    name: "Ocean Cleanup Initiative",
    imageUrl: "/images/image-2.png",
    funded: 45,
    daysLeft: 18,
    description: "Blockchain-verified ocean cleanup operations with real-time impact tracking.",
    creator: "0xOceanDAO...",
    goalAmount: 200000,
    raisedAmount: 90000,
  },
];

const filterCategories = [
  { id: 'all', name: 'All Projects', icon: Globe },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
  { id: 'ending-soon', name: 'Ending Soon', icon: Clock },
  { id: 'featured', name: 'Featured', icon: Zap },
];


// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/my-projects/${project.id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="group relative bg-blue-950/20 backdrop-blur-sm border border-blue-400/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/40 hover:bg-blue-900/30"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
            project.daysLeft <= 7 
              ? 'bg-orange-500/20 border-orange-400/30 text-orange-300'
              : project.funded >= 80
              ? 'bg-green-500/20 border-green-400/30 text-green-300'
              : 'bg-blue-500/20 border-blue-400/30 text-blue-300'
          }`}>
            {project.daysLeft <= 7 ? 'Ending Soon' : project.funded >= 80 ? 'Almost Funded' : 'Active'}
          </div>
        </div>

        {/* View Project Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <ExternalLink className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors">
          {project.name}
        </h3>
        
        <p className="text-blue-200 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-blue-300">Progress</span>
            <span className="text-xs font-semibold text-white">{project.funded}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(project.funded, 100)}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm">
          <div>
            <div className="text-white font-semibold">{project.raisedAmount.toLocaleString()} SUI</div>
            <div className="text-blue-300">raised of {project.goalAmount.toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">{project.daysLeft}</div>
            <div className="text-blue-300">days left</div>
          </div>
        </div>

        {/* Creator */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-blue-400/20">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Users className="w-3 h-3 text-white" />
          </div>
          <span className="text-blue-300 text-xs font-mono">{project.creator}</span>
        </div>
      </div>
    </motion.div>
  );
}


export default function ProjectDiscoveryPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects");
        const chainProjects = await res.json();
        setProjects([...chainProjects, ...mockProjects]);
      } catch (err) {
        console.error("❌ Failed to load projects:", err);
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'trending') return matchesSearch && project.funded > 50;
    if (selectedFilter === 'ending-soon') return matchesSearch && project.daysLeft < 15;
    if (selectedFilter === 'featured') return matchesSearch && project.funded > 70;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,0,0.1),transparent_50%)]" />
        
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="text-center py-16 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Discover innovative projects</span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Explore Projects
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Support groundbreaking ideas and be part of revolutionary projects powered by blockchain technology
          </motion.p>

          {/* Search and Filter Bar */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
              </div>

              {/* Filter Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {filterCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedFilter === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="px-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Target, label: 'Active Projects', value: projects.length.toString(), color: 'from-blue-500 to-cyan-500' },
                { icon: Users, label: 'Total Backers', value: '12.5K+', color: 'from-purple-500 to-pink-500' },
                { icon: Zap, label: 'Funds Raised', value: '$2.8M+', color: 'from-orange-500 to-yellow-500' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:bg-white/10 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <motion.div 
                className="flex items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-gray-400 text-lg">Loading amazing projects...</span>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div 
                  className="flex items-center justify-between mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white">
                    {selectedFilter === 'all' ? 'All Projects' : filterCategories.find(f => f.id === selectedFilter)?.name}
                  </h2>
                  <div className="text-gray-400">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                  </div>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.1 * index,
                        ease: "easeOut"
                      }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                  <motion.div 
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                    <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedFilter('all');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  )}
