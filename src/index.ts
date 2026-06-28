import { getHTML } from "./crawl.js";
import argv from "node:process";
import { crawlPage } from "./crawlPage.js";
async function main() {
  if (argv.argv.length < 3) {
    console.log("Please Provide One URL");
    process.exit(1);
  }
  if (argv.argv.length > 3) {
    console.log("I've Enter more then One URL");
    process.exit(1);
  }
  const baseURL = argv.argv[2];
  const crawl = await crawlPage(baseURL, baseURL, {});
  console.log("crawler is starting at the baseURL:", baseURL);
  console.log(crawl);

  process.exit(0);
}
main();
