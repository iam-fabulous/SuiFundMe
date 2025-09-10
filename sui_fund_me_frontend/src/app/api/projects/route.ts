import { NextResponse } from "next/server";
import { fetchProjectsFromChain } from "../../../lib/sui";
import { getCachedProjects, setCachedProjects } from "../../../lib/cache";

export async function GET() {
  try {
    const cached = getCachedProjects();
    if (cached) {
      console.log("✅ Returning cached projects");
      return NextResponse.json(cached);
    }

    const projects = await fetchProjectsFromChain();

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
