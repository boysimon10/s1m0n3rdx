import { css } from "../../../styled-system/css";

export const panel = css({ border: "3px solid {colors.border}", bg: "surface" });

export const inkPanel = css({ border: "3px solid {colors.border}", bg: "text", color: "inverse" });

export const layer = css({ position: "absolute", inset: "0", pointerEvents: "none" });

export const toneCorner = css({
  backgroundImage: "radial-gradient({colors.border} 1px, transparent 1.3px)",
  backgroundSize: "7px 7px",
  maskImage: "linear-gradient(135deg, transparent 30%, #000 100%)",
});

export const tone = css({
  backgroundImage: "radial-gradient({colors.border} 1px, transparent 1.3px)",
  backgroundSize: "7px 7px",
  opacity: "0.5",
});

export const toneRed = css({
  position: "absolute",
  right: "-30px",
  top: "-30px",
  w: "300px",
  h: "300px",
  rounded: "full",
  backgroundImage: "radial-gradient({colors.accent} 1.6px, transparent 1.9px)",
  backgroundSize: "8px 8px",
  pointerEvents: "none",
});

export const speedCenter = css({
  position: "absolute",
  inset: "-20%",
  background: "repeating-conic-gradient(from 0deg at 50% 50%, {colors.border} 0deg 0.7deg, transparent 0.7deg 4.5deg)",
  maskImage: "radial-gradient(circle at 50% 50%, transparent 26%, #000 62%)",
  pointerEvents: "none",
});

export const speedCorner = css({
  position: "absolute",
  inset: "0",
  background: "repeating-conic-gradient(from 0deg at 85% 18%, {colors.border} 0deg 0.6deg, transparent 0.6deg 4deg)",
  maskImage: "radial-gradient(circle at 85% 18%, transparent 12%, #000 70%)",
  opacity: "0.55",
  pointerEvents: "none",
});

export const hatch = css({
  position: "absolute",
  inset: "0",
  background: "repeating-linear-gradient(-62deg, transparent 0 14px, color-mix(in srgb, var(--colors-inverse) 9%, transparent) 14px 15px)",
  pointerEvents: "none",
});

export const cutRight = css({ md: { clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)" } });
export const cutLeft = css({ md: { clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)" } });

export const lift = css({
  transition: "transform 0.15s, box-shadow 0.15s",
  _hover: { transform: "translate(-3px, -3px)", boxShadow: "6px 6px 0 {colors.accent}" },
  _motionReduce: { transition: "none" },
});

export const mono = css({ fontFamily: "mono", fontWeight: "500", fontSize: "12px", lineHeight: "1" });

export const chipInk = css({ py: "6px", px: "9px", bg: "text", color: "inverse", fontFamily: "mono", fontWeight: "500", fontSize: "12px", lineHeight: "1", whiteSpace: "nowrap" });

export const chipLine = css({ py: "6px", px: "8px", border: "2px solid {colors.border}", bg: "surface", fontFamily: "mono", fontWeight: "500", fontSize: "12px", lineHeight: "1", whiteSpace: "nowrap" });

export const pageTitle = css({ m: "0", fontFamily: "display", fontWeight: "900", fontSize: "clamp(4rem, 12vw, 7.5rem)", lineHeight: "0.82", letterSpacing: "-0.055em" });

export const panelBar = css({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", py: "14px", px: "18px", borderBottom: "3px solid {colors.border}" });
export const panelBarTitle = css({ fontFamily: "display", fontWeight: "800", fontSize: "22px", lineHeight: "1", letterSpacing: "-0.02em" });
export const panelBarLink = css({ fontFamily: "mono", fontWeight: "500", fontSize: "13px", lineHeight: "1", whiteSpace: "nowrap", _hover: { color: "accent" } });
