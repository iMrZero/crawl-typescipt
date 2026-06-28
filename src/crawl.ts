import { JSDOM } from "jsdom";
type ExtractedPageData = {
  url: string;
  heading: string;
  first_paragraph: string;
  outgoing_links: string[];
  image_urls: string[];
};
export function normalizeURL(url: string): string {
  const urlObj = new URL(url);
  const hostName: string = urlObj.hostname;
  const pathName: string = urlObj.pathname;
  let normalized: string =
    pathName.at(-1) === "/"
      ? hostName + pathName.slice(0, -1)
      : hostName + pathName;

  return normalized;
}
export function getURLsFromHTML(html: string, baseURL: string): string[] {
  const dom = new JSDOM(html);
  const links: NodeListOf<HTMLAnchorElement> =
    dom.window.document.querySelectorAll("a");
  let url: string[] = [];
  for (let link of links) {
    if (link.href.startsWith("/")) {
      url.push(baseURL + link.href);
    } else {
      url.push(link.href);
    }
  }
  return url;
}
export function getImagesFromHTML(html: string, baseURL: string): string[] {
  const dom = new JSDOM(html);
  const images: NodeListOf<HTMLImageElement> =
    dom.window.document.querySelectorAll("img");
  const editedBaseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  let url: string[] = [];
  if (images.length > 0) {
    for (let image of images) {
      if (image.src.startsWith("/")) {
        url.push(editedBaseURL + image.src);
      } else {
        url.push(image.src);
      }
    }
  }
  return url;
}
export function getHeadingFromHTML(html: string): string {
  const dom = new JSDOM(html);
  const h1 = dom.window.document.querySelector("h1");
  const h2 = dom.window.document.querySelector("h2");
  let text: string = h1 ? h1.textContent : h2 ? h2.textContent : "";
  return text;
}
export function getFirstParagraphFromHTML(html: string): string {
  const dom = new JSDOM(html);
  const firstParagraph =
    dom.window.document.querySelector("main > p") ||
    dom.window.document.querySelector("p");
  return firstParagraph ? firstParagraph.textContent : "";
}

export function extractPageData(
  html: string,
  pageURL: string,
): ExtractedPageData {
  const url = pageURL;
  const heading = getHeadingFromHTML(html);
  const firstParagraph = getFirstParagraphFromHTML(html);
  const outgoingLinks = getURLsFromHTML(html, pageURL);
  const imageURLs = getImagesFromHTML(html, pageURL);

  return {
    url,
    heading,
    first_paragraph: firstParagraph,
    outgoing_links: outgoingLinks,
    image_urls: imageURLs,
  };
}

export async function getHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "BootCrawler/1.0" },
    });
    if (res.status > 399) {
      console.log("there is an error with status >", res.status);
      return;
    }
    if (!res.headers.get("content-type")?.includes("text/html")) {
      console.log(
        "is not an text/html is an: ",
        res.headers.get("content-type"),
      );
      return;
    }
    return res.text();
  } catch (error: any) {
    console.log(error.message);
  }
}
