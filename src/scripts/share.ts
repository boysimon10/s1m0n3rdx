// [data-share] buttons: native share sheet when available (mobile), copy the link otherwise
const COPIED_MS = 1600;

async function share(btn: HTMLButtonElement, onCopied: () => void) {
  // classic pages point their canonical to the modern one
  const url = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? location.href;
  const data = { title: btn.dataset.title ?? document.title, url };

  const canShare = "share" in navigator && (!("canShare" in navigator) || navigator.canShare(data));
  if (canShare) {
    try {
      await navigator.share(data);
    } catch {
      // share sheet dismissed
    }
    return;
  }

  await navigator.clipboard.writeText(url);
  onCopied();
}

for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-share]")) {
  const label = btn.querySelector("[data-share-label]");
  const initial = label?.textContent ?? "";
  let timer: ReturnType<typeof setTimeout>;

  btn.addEventListener("click", () => {
    void share(btn, () => {
      if (!label) return;
      label.textContent = btn.dataset.copied ?? initial;
      clearTimeout(timer);
      timer = setTimeout(() => (label.textContent = initial), COPIED_MS);
    });
  });
}
