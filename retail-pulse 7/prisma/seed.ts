import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const sources = [
    {
      name: "BBC Business",
      url: "https://feeds.bbci.co.uk/news/business/rss.xml",
      weight: 3,
      worldview: "uk"
    },
    {
      name: "The Grocer",
      url: "https://www.thegrocer.co.uk/rss",
      weight: 4,
      worldview: "uk"
    },
    {
      name: "Retail Gazette",
      url: "https://www.retailgazette.co.uk/feed/",
      weight: 4,
      worldview: "uk"
    },
    {
      name: "Talking Retail",
      url: "https://www.talkingretail.com/feed/",
      weight: 3,
      worldview: "uk"
    },
    {
      name: "Reuters Retail",
      url: "https://www.reuters.com/rssFeed/retail/",
      weight: 4,
      worldview: "global"
    },
    {
      name: "Retail Dive",
      url: "https://www.retaildive.com/feeds/news/",
      weight: 3,
      worldview: "north_america"
    },
    {
      name: "Retail Detail EU",
      url: "https://www.retaildetail.eu/en/feed/",
      weight: 3,
      worldview: "europe"
    }
  ];

  for (const s of sources) {
    await prisma.source.upsert({
      where: { url: s.url },
      update: s,
      create: s
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
