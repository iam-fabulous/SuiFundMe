import { NextResponse } from "next/server";
import { fetchProjectById } from "../../../../lib/sui";

// Mock fallback for detail pages
const mockProjects: Record<string, any> = {
  "mock-1": {
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
  "mock-2": {
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
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try fetching from chain
    const project = await fetchProjectById(id);
    if (project) return NextResponse.json(project);

    // Otherwise fallback to mock
    if (mockProjects[id]) return NextResponse.json(mockProjects[id]);

    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch project detail", details: err.message },
      { status: 500 }
    );
  }
}
