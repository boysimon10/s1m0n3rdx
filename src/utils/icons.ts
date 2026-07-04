import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as DevIcons from "developer-icons";
import * as SimpleIcons from "simple-icons";

type DevIconName = keyof typeof DevIcons;

export type IconSource = "dev" | "si";

export function getIconSvg(
  icon: string,
  iconSource: IconSource = "dev",
  size = 16,
  color = "currentColor"
): string {
  if (!icon) return "";

  if (iconSource === "dev") {
    const Icon = DevIcons[icon as DevIconName] as
      | ((props: { size: number }) => React.ReactElement)
      | undefined;
    if (!Icon) return "";
    return renderToStaticMarkup(createElement(Icon, { size }));
  }

  const siIcon = Object.entries(SimpleIcons).find(([k]) => k === icon)?.[1] as
    | { path: string; hex: string }
    | undefined;
  if (!siIcon) return "";
  const fill = color !== "currentColor" ? color : `#${siIcon.hex}`;
  const s = String(size);
  return `<svg role="img" viewBox="0 0 24 24" width="${s}" height="${s}" fill="${fill}" xmlns="http://www.w3.org/2000/svg"><path d="${siIcon.path}"/></svg>`;
}
