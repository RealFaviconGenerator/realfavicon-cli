import { checkDesktopFavicon } from "@realfavicongenerator/check-favicon";
import { parse } from 'node-html-parser'

export const getUrl = (urlOrPort: string): string => {
  if (urlOrPort.match(/^\d+$/)) return `http://localhost:${urlOrPort}`;
  return urlOrPort;
}

export const check = async (urlOrPort: string) => {
  const url = getUrl(urlOrPort);
  const response = await fetch(url);
  const html = await response.text();
  const root = parse(html);
  const head = root.querySelector('head');
  const report = await checkDesktopFavicon(url, head);
  console.log(report);
}
