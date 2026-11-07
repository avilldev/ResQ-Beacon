
import { isAdminAuthorized } from "../../../../../lib/adminAuth";

export async function POST(request, context) {
  // Check admin authorization.
  if (!(await isAdminAuthorized(request))) {
    return Response.json(
      { detail: "Forbidden" },
      { status: 403 }
    );
  }

  // Obtain and validate the request ID.
  const { id } = await context.params;

  if (!/^[1-9]\d*$/.test(id)) {
    return Response.json(
      { detail: "Invalid request ID" },
      { status: 400 }
    );
  }

  // Private server-side environment variables.
  const backendUrl = process.env.BACKEND_API_URL?.replace(/\/+$/, "");
  const adminKey = process.env.ADMIN_API_KEY;

  if (!backendUrl || !adminKey) {
    return Response.json(
      { detail: "Admin server is not configured" },
      { status: 503 }
    );
  }

  try {
    // Forward the request to FastAPI with the secret key.
    const response = await fetch(
      `${backendUrl}/requests/${id}/analyze`,
      {
        method: "POST",
        headers: {
          "X-Admin-Key": adminKey,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return Response.json(
        { detail: "AI analysis failed or unavailable" },
        { status: response.status }
      );
    }

    const result = await response.json();

    return Response.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

  } catch (error) {
    console.error("Admin AI request failed:", error);

    return Response.json(
      { detail: "Backend unavailable" },
      { status: 502 }
    );
  }
}
