import { getHTML, getURLsFromHTML, normalizeURL } from "./crawl.js";

export async function crawlPage(
  baseURL: string,
  currentURL: string,
  pages: Record<string, number>,
) {
  const baseObj = new URL(baseURL);
  const currentObj = new URL(currentURL);

  if (baseObj.hostname !== currentObj.hostname) {
    return pages;
  }
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;
  console.log(`■ activly crawling ::> ${currentURL} \n`);

  try {
    const htmlContent = await getHTML(currentURL);
    const nextURLs = getURLsFromHTML(htmlContent ? htmlContent : "", baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error: any) {
    console.log(`error on fetch: ${error.message} on page ${currentURL}`);
  }
  return pages;
}
