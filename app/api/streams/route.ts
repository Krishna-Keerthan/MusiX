import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createStreamSchema = z.object({
  creatorId: z.string().min(1, "Creator ID is required"),
  url: z.string().url("Invalid URL"),
});

function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // Short URL: https://youtu.be/<id>
    if (parsedUrl.hostname === "youtu.be") {
      const id = parsedUrl.pathname.slice(1);
      return id.length === 11 ? id : null;
    }

    // Standard URL: https://www.youtube.com/watch?v=<id>
    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com" ||
      parsedUrl.hostname === "m.youtube.com"
    ) {
      const id = parsedUrl.searchParams.get("v");
      return id && id.length === 11 ? id : null;
    }

    return null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = createStreamSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { creatorId, url } = result.data;

    const extractedCode = extractYouTubeVideoId(url);

    if (!extractedCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid YouTube URL",
        },
        { status: 400 }
      );
    }

    await prisma.stream.create({
      data: {
        type: "Youtube",
        active: true,
        userId: creatorId,
        url,
        extractedCode,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Stream added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating stream:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

