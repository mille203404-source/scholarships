import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query parameter q" }, { status: 400 });
  }

  const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    q
  )}`;

  // Nominatim requires a valid User-Agent or Referer. We include a contact email as requested.
  const res = await fetch(nominatimUrl, {
    headers: {
      "User-Agent": "mille203404-source/scholarships/1.0 (Mille203404@gmail.com)",
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Geocoding failed" }, { status: res.status });
  }

  const data = await res.json();
  const top = data && data.length ? data[0] : null;

  if (!top) return NextResponse.json(null);

  return NextResponse.json({
    lat: top.lat,
    lon: top.lon,
    display_name: top.display_name,
  });
}
