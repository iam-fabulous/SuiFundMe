// "use client";

// import Link from "next/link";
// import { ChainProject } from "@/lib/sui";

// interface ProjectCardProps {
//   project: ChainProject;
// }

// export default function ProjectCard({ project }: ProjectCardProps ) {
//   return (
//     <Link href={`/projects/${project.id}`}>
//       <div className="flex flex-col gap-4 rounded-lg bg-gray-600 overflow-hidden group transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
//         <div
//           className="w-full bg-center bg-no-repeat aspect-video bg-cover"
//           style={{ backgroundImage: `url("${project.imageUrl}")` }}
//         ></div>
//         <div className="p-4 flex flex-col gap-3">
//           <h3 className="text-white text-base font-bold leading-snug">
//             {project.name}
//           </h3>
//           <div className="space-y-2">
//             <div className="w-full bg-gray-700 rounded-full h-2.5">
//               <div
//                 className="bg-blue-500 h-2.5 rounded-full neon-blue-shadow"
//                 style={{ width: `${project.funded}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between items-center text-xs font-medium">
//               <span className="text-blue-500">{project.funded}% Funded</span>
//               <span className="text-gray-400">{project.daysLeft} days left</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChainProject } from "@/lib/sui";
import { Clock, Target, TrendingUp, Users, Zap } from "lucide-react";

interface ProjectCardProps {
  project: ChainProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const progressPercentage = (project.raisedAmount / project.goalAmount) * 100;
  const isHotProject = project.funded > 70;
  const isEndingSoon = project.daysLeft <= 7;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500">
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
          
          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {isHotProject && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg"
              >
                <Zap className="w-3 h-3" />
                HOT
              </motion.div>
            )}
            {isEndingSoon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse"
              >
                <Clock className="w-3 h-3" />
                ENDING SOON
              </motion.div>
            )}
          </div>

          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url("${project.imageUrl}")` }}
              whileHover={{ scale: 1.1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            
            {/* Floating Stats */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <motion.div
                className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-3 h-3" />
                {Math.floor(Math.random() * 150) + 20}
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Project Title */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                {project.name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                {project.description}
              </p>
            </div>

            {/* Creator */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {project.creator.slice(2, 4).toUpperCase()}
              </div>
              <span>by {project.creator}</span>
            </div>

            {/* Progress Section */}
            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: [-100, 200] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-bold">{project.funded}%</span>
                  </div>
                  <div className="text-gray-500 text-xs">Funded</div>
                </motion.div>

                <motion.div 
                  className="text-center border-x border-slate-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                    <Target className="w-3 h-3" />
                    <span className="font-bold">{formatCurrency(project.goalAmount)}</span>
                  </div>
                  <div className="text-gray-500 text-xs">Goal</div>
                </motion.div>

                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-bold">{project.daysLeft}</span>
                  </div>
                  <div className="text-gray-500 text-xs">Days left</div>
                </motion.div>
              </div>

              {/* Raised Amount */}
              <div className="pt-2 border-t border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Raised</span>
                  <span className="font-bold text-white">{formatCurrency(project.raisedAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />

          {/* Interactive Elements */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <TrendingUp className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
