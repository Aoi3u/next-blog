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
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg">
          {post.topImage && (
            <div className="relative w-full h-[480px]">
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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium text-lg">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">
                    {post.author.name}
                  </p>
                  <time className="text-sm text-gray-500">
                    {format(new Date(post.createdAt), "yyyy年MM月dd日", {
                      locale: ja,
                    })}
                  </time>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                  <svg
                    className="w-6 h-6"
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
            <CardTitle className="text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <article className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-lg prose-pre:bg-gray-50">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                skipHtml={false}
                unwrapDisallowed={true}
              >
                {post.content}
              </ReactMarkdown>
            </article>
            <div className="mt-12 flex justify-center">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-full shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:translate-y-[-2px]">
                <Link href={`/`} className="flex items-center gap-2">
                  ← 記事一覧に戻る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
