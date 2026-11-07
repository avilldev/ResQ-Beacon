
import { createRemoteJWKSet, jwtVerify } from "jose";

export async function isAdminAuthorized(request) {
  const hostname = new URL(request.url).hostname;

  // Allow localhost testing during development only.
  if (
    process.env.NODE_ENV === "development" &&
    ["localhost", "127.0.0.1"].includes(hostname)
  ) {
    return true;
  }

  // Production requires a valid Cloudflare Access token.
  const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
  const audience = process.env.CF_ACCESS_AUD;
  const token = request.headers.get("cf-access-jwt-assertion");

  if (!teamDomain || !audience || !token) {
    return false;
  }

  try {
    const issuer = `https://${teamDomain}`;

    const jwks = createRemoteJWKSet(
      new URL(`${issuer}/cdn-cgi/access/certs`)
    );

    await jwtVerify(token, jwks, {
      issuer,
      audience,
    });

    return true;
  } catch {
    return false;
  }
}
