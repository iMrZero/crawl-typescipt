# Crawl-TypeScript

A lightweight **web crawler built with TypeScript** for scraping, indexing, and analyzing web pages. This project demonstrates how to build a modular crawler with configurable options, making it suitable for learning, experimentation, or integration into larger scraping pipelines.

---

## 🚀 Features

- **TypeScript-based** for strong typing and maintainability  
- **Customizable crawling** depth and concurrency  
- **HTML parsing** using Cheerio (or similar libraries)  
- **Link extraction** for recursive crawling  
- **Robust error handling** and retry logic  
- **Extensible architecture** for plugins or additional parsers  

---

## 📦 Installation

```bash
git clone https://github.com/iMrZero/crawl-typescript.git
cd crawl-typescript
npm install
```

## Usage

```bash
npm run start -- <URL>
npm run start -- https://example.com
```

## Structure

```
crawl-typescript/
├── src/
│   ├── crawler.ts       # Core crawling logic
│   ├── parser.ts        # HTML parsing utilities
│   ├── index.ts         # Entry point
├── tests/               # Unit tests
├── package.json
└── README.md
```

## Acknowledgments

Built following the [Build a Web Scraper with TypeScript] course on Boot.dev (https://www.boot.dev/courses/build-web-scraper-typescript)
