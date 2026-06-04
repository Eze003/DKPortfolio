import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json(
        { error: "Missing paramsToSign" },
        { status: 400 }
      );
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiSecret) {
      console.error("CLOUDINARY_API_SECRET is not configured");
      return NextResponse.json(
        { error: "Cloudinary API Secret not configured on server" },
        { status: 500 }
      );
    }

    // Sort parameters alphabetically
    const sortedKeys = Object.keys(paramsToSign).sort();
    const stringToSign = sortedKeys
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join("&");

    // Create SHA-1 hash of parameters sorted alphabetically and appended with the API secret
    const signature = crypto
      .createHash("sha1")
      .update(stringToSign + apiSecret)
      .digest("hex");

    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
