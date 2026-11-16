import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/lib/sanity/content";

/**
 * Sanity webhook target. When the owner publishes, unpublishes, or deletes
 * content, Sanity calls this URL and the site's cached content is cleared so
 * the change shows up on the next page view, with no redeploy.
 *
 * The request must be signed with SANITY_REVALIDATE_SECRET.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured." }, { status: 500 });
  }

  try {
    const { isValidSignature } = await parseBody(request, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    }
    revalidateTag(SANITY_TAG, { expire: 0 });
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: "Could not process the request." }, { status: 400 });
  }
}
