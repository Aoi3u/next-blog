import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 12);

  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2/600/400",
  ];

  const commenter = await prisma.user.create({
    data: {
      email: "commenter@test.com",
      name: "コメント投稿者",
      password: hashedPassword,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Test User",
      password: hashedPassword,
      posts: {
        create: [
          {
            title: "初めてのブログ",
            content: "これは私の初めてのブログ投稿です。",
            topImage: dummyImages[0],
            published: true,
            comments: {
              create: [
                {
                  content: "素晴らしい記事ですね！",
                  authorId: commenter.id,
                },
                {
                  content: "とても参考になりました。",
                  authorId: commenter.id,
                },
              ],
            },
          },
          {
            title: "２つ目のブログ",
            content: "これは私の２つ目のブログ投稿です。",
            topImage: dummyImages[1],
            published: true,
            comments: {
              create: [
                {
                  content: "興味深い内容ですね。",
                  authorId: commenter.id,
                },
                {
                  content: "もっと詳しく知りたいです。",
                  authorId: commenter.id,
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
