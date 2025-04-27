import { prisma } from "@/lib/prisma";

export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return post;
}

export async function searchPosts(search: string) {
  const decodedSearch = decodeURIComponent(search);
  const nomalizedSearch = decodedSearch.replace(/[\s　]+/g, " ").trim();
  const searchWords = nomalizedSearch.split(" ").filter(Boolean);

  const filters = searchWords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));

  return await prisma.post.findMany({
    where: {
      AND: filters,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
