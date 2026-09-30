import { ImageResponse } from "next/og";

export const alt = "Aliança Alimentos — Batata palha e snacks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#C8102E",
          color: "#fff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 8, color: "#F3D98B" }}>ALIANÇA ALIMENTOS</div>
        <div style={{ display: "flex", fontSize: 110, fontStyle: "italic", marginTop: 20 }}>Batata Palha</div>
        <div style={{ display: "flex", fontSize: 48, marginTop: 10 }}>crocante do primeiro ao último fio.</div>
        <div style={{ display: "flex", marginTop: 50, height: 16, width: 360, background: "#C9A24B" }} />
      </div>
    ),
    size,
  );
}
