import { prisma } from "./prisma";

export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: { source: true }
  });
}
