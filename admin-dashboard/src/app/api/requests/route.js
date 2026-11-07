
import { isAdminAuthorized } from "../../../lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  // Verify who is accessing the private API.
  if (!(await isAdminAuthorized(request))) {
    return Response.json(
      { detail: "Forbidden" },
      { status: 403 }
    );
  }

  const backendUrl = process.env.BACKEND_API_URL?.replace(/\/+$/, "");
  const adminKey = process.env.ADMIN_API_KEY;

  if (!backendUrl || !adminKey) {
    return Response.json(
      { detail: "Admin server is not configured" },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(
      `${backendUrl}/admin/requests`,
      {
        headers: {
          "X-Admin-Key": adminKey,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return Response.json(
        { detail: "Could not retrieve reports" },
        { status: response.status }
      );
    }

    const requests = await response.json();

    return Response.json(requests, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Admin backend connection failed:", error);

    return Response.json(
      { detail: "Backend unavailable" },
      { status: 502 }
    );
  }
}
