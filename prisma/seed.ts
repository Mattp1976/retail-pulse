import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sources = [
  {
        name: 'Retail Week',
        url: 'https://www.retail-week.com/rss',
        weight: 10,
        worldview: 'uk',
  },
  {
        name: 'The Grocer',
        url: 'https://www.thegrocer.co.uk/rss',
        weight: 9,
        worldview: 'uk',
  },
  {
        name: 'Retail Gazette',
        url: 'https://www.retailgazette.co.uk/feed/',
        weight: 8,
        worldview: 'uk',
  },
  {
        name: 'Retail Times',
        url: 'https://www.retailtimes.co.uk/feed/',
        weight: 7,
        worldview: 'uk',
  },
  {
        name: 'Internet Retailing',
        url: 'https://internetretailing.net/feed/',
        weight: 8,
        worldview: 'europe',
  },
  {
        name: 'Retail Dive',
        url: 'https://www.retaildive.com/feeds/news/',
        weight: 9,
        worldview: 'north_america',
  },
  {
        name: 'NRF',
        url: 'https://nrf.com/rss.xml',
        weight: 10,
        worldview: 'north_america',
  },
  {
        name: 'Retail TouchPoints',
        url: 'https://www.retailtouchpoints.com/feed',
        weight: 8,
        worldview: 'global',
  },
  ];

const sampleArticles = [
  {
        title: 'UK Grocery Sales Hit Record High',
        url: 'https://example.com/article-1',
        publishedAt: new Date('2025-02-01T10:00:00Z'),
        snippet: 'UK grocery sales reached unprecedented levels as consumers adjusted to new shopping habits.',
  },
  {
        title: 'Major Retailer Announces Expansion Plans',
        url: 'https://example.com/article-2',
        publishedAt: new Date('2025-02-02T14:30:00Z'),
        snippet: 'Leading retailer reveals ambitious store expansion plans across multiple regions.',
  },
  {
        title: 'E-commerce Growth Continues to Accelerate',
        url: 'https://example.com/article-3',
        publishedAt: new Date('2025-02-03T09:15:00Z'),
        snippet: 'Online retail continues to see strong growth as digital transformation reshapes the industry.',
  },
  {
        title: 'Sustainability Initiatives Drive Consumer Choices',
        url: 'https://example.com/article-4',
        publishedAt: new Date('2025-02-03T16:45:00Z'),
        snippet: 'Consumers increasingly prioritize sustainability when making purchasing decisions.',
  },
  {
        title: 'Supply Chain Innovation Transforms Retail',
        url: 'https://example.com/article-5',
        publishedAt: new Date('2025-02-04T08:00:00Z'),
        snippet: 'New technologies are revolutionizing how retailers manage their supply chains.',
  },
  ];

async function main() {
    console.log('Starting seed...');

  // Create sources
  for (const source of sources) {
        const created = await prisma.source.upsert({
                where: { url: source.url },
                update: source,
                create: source,
        });
        console.log(`Created source: ${created.name}`);
  }

  // Get the first source for sample articles
  const firstSource = await prisma.source.findFirst();
    if (!firstSource) {
          throw new Error('No source found');
    }

  // Create sample articles
  for (const article of sampleArticles) {
        const created = await prisma.article.upsert({
                where: { url: article.url },
                update: { ...article, sourceId: firstSource.id },
                create: { ...article, sourceId: firstSource.id },
        });
        console.log(`Created article: ${created.title}`);
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
        console.error(e);
        process.exit(1);
  })
  .finally(async () => {
        await prisma.$disconnect();
  });
