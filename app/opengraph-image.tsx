import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Global Health Signal Command";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #020617, #083344)", color: "#e0f2fe", padding: "56px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontSize: 26, letterSpacing: "0.3em" }}>HEALTH SIGNAL COMMAND</div>
        <div style={{ fontSize: 78, lineHeight: 1 }}>Operational Telemetry Dashboard</div>
      </div>
    ),
    size
  );
}
