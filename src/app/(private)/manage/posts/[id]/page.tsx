import { getOwnPost } from "@/lib/ownPost";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { auth } from "@/auth";
import { ja } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ShowPage({ params }: PageProps) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }

  const { id } = await params;
  const post = await getOwnPost(userId, id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg">
          {post.topImage && (
            <div className="relative w-full h-[400px]">
              <Image
                src={post.topImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          )}
          <CardHeader className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{post.author.name}</p>
              </div>
              <time className="text-sm text-gray-500 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {format(new Date(post.createdAt), "yyyy年MM月dd日", {
                  locale: ja,
                })}
              </time>
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                skipHtml={false}
                unwrapDisallowed={true}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
