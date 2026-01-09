import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111111 0%, #3b2f1e 100%)",
          color: "#faf8f5",
          fontSize: 64,
          fontFamily: "serif",
          letterSpacing: "0.4em"
        }}
      >
        CRIBCOVE
      </div>
    ),
    size
  );
}
