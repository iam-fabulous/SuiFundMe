import { NextResponse } from "next/server";
import { fetchProjectsFromChain } from "../../../lib/sui";
import { getCachedProjects, setCachedProjects } from "../../../lib/cache";

export async function GET() {
  try {
    // ✅ Try cache first
    const cached = getCachedProjects();
    if (cached) {
      console.log("✅ Returning cached projects");
      return NextResponse.json(cached);
    }

    // ✅ Otherwise fetch from chain (with mock fallback)
    const projects = await fetchProjectsFromChain();

    // ✅ Cache them
    setCachedProjects(projects);

    return NextResponse.json(projects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
