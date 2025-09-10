import type { ChainProject } from "./sui";

let cachedProjects: ChainProject[] | null = null;
let lastFetchedAt: number | null = null;
const CACHE_TTL = 60 * 1000; 

export function getCachedProjects(): ChainProject[] | null {
  if (lastFetchedAt && Date.now() - lastFetchedAt < CACHE_TTL) {
    return cachedProjects;
  }
  return null;
}

export function setCachedProjects(projects: ChainProject[]) {
  cachedProjects = projects;
  lastFetchedAt = Date.now();
}
