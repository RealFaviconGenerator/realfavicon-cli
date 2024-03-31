import { CheckerMessage, CheckerStatus, checkFavicon } from "@realfavicongenerator/check-favicon";
import { parse } from 'node-html-parser'

export const getUrl = (urlOrPort: string): string => {
  if (urlOrPort.match(/^\d+$/)) return `http://localhost:${urlOrPort}`;
  return urlOrPort;
}

const statusToIcon = (status: CheckerStatus): string => {
  switch(status) {
    case CheckerStatus.Error:
      return '❌';
    case CheckerStatus.Warning:
      return '⚠️';
    case CheckerStatus.Ok:
      return '✅';
  }
}

const printMessages = (report: CheckerMessage[], indentation = 2) => {
  const indent = ' '.repeat(indentation);

  report.forEach((message) => {
    console.log(`${indent}${statusToIcon(message.status)} ${message.text}`);
  });
}

export const check = async (urlOrPort: string) => {
  const url = getUrl(urlOrPort);
  const response = await fetch(url);
  const html = await response.text();
  const root = parse(html);
  const head = root.querySelector('head');

  const report = await checkFavicon(url, head);

  console.log();
  console.log("Desktop");
  printMessages(report.desktop.messages);

  console.log();
  console.log("Touch");
  printMessages(report.touchIcon.messages);

  console.log();
  console.log("Web Manifest");
  printMessages(report.webAppManifest.messages);
}
