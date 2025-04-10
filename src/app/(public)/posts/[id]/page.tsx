import { getPost } from "@/lib/post";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Params) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg border border-gray-100">
          {post.topImage && (
            <div className="relative w-full h-[480px] overflow-hidden">
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
          <CardHeader className="space-y-6 px-8 pt-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">
                    {post.author.name}
                  </p>
                  <time className="text-sm text-gray-500 font-medium">
                    {format(new Date(post.createdAt), "yyyy年MM月dd日", {
                      locale: ja,
                    })}
                  </time>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-indigo-600 transition-colors p-2 hover:bg-gray-50 rounded-full">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-gray-50/80 prose-pre:border prose-pre:border-gray-100">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                skipHtml={false}
                unwrapDisallowed={true}
              >
                {post.content}
              </ReactMarkdown>
            </article>
            <div className="flex items-center justify-between pt-8 mt-12 border-t border-gray-100">
              <Button
                asChild
                variant="outline"
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                <Link href="/" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  記事一覧に戻る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
