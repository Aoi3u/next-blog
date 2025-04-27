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
import CommentForm from "@/components/comment/CommentForm";
import CommentList from "@/components/comment/CommentList";
import { auth } from "@/auth";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Params) {
  const { id } = await params;
  const post = await getPost(id);
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-bpy-12">
      <div className="container max-w-5xl mx-auto px-4">
        <Card className="overflow-hidden shadow-xl border border-gray-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          {post.topImage && (
            <div className="relative w-full aspect-[21/9] overflow-hidden">
              <Image
                src={post.topImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-500 hover:scale-105 will-change-transform"
                priority
              />
            </div>
          )}
          <CardHeader className="space-y-6 px-8 pt-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center ring-4 ring-white">
                  <span className="text-white font-medium text-lg">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">
                    {post.author.name}
                  </p>
                  <time className="text-sm text-gray-500 font-medium flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
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
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight tracking-tight">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-gray-50/80 prose-pre:border prose-pre:border-gray-100 prose-pre:shadow-sm prose-blockquote:border-l-indigo-500">
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
                className="bg-white/80 hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 transition-all duration-200 backdrop-blur-sm"
              >
                <Link href="/" className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m15 18-6-6 6-6"
                    />
                  </svg>
                  記事一覧に戻る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* コメントセクション */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
            コメント
          </h2>
          {session ? (
            <CommentForm postId={post.id} />
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600">
                コメントを投稿するには
                <Link
                  href="/login"
                  className="text-indigo-600 hover:underline font-medium mx-1"
                >
                  ログイン
                </Link>
                してください
              </p>
            </div>
          )}
          <div className="mt-12">
            <CommentList
              comments={post.comments}
              currentUserId={currentUserId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
