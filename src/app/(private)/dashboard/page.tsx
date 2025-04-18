import { auth } from "@/auth";
import PrivatePostCard from "@/components/post/PrivatePostCard";
import { getPosts, searchPosts } from "@/lib/post";
import { Post } from "@/types/post";
import DashboardSearchBox from "@/components/post/DashBoardSearchBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SearchParams = {
  search?: string;
};

export default async function DashBoardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }

  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search || "";

  const posts = query
    ? ((await searchPosts(query)) as Post[])
    : ((await getPosts()) as Post[]);

  return (
    <main className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="relative py-12 px-6 rounded-3xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5">
          {!query && (
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Latest Articles
              </h1>
              <p className="text-xl text-gray-600">
                技術的な知見や最新のトレンドをお届けします
              </p>
            </div>
          )}
          <div className="max-w-2xl mx-auto">
            <DashboardSearchBox />
          </div>
        </div>

        {query && (
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              &ldquo;{query}&rdquo; の検索結果
            </h2>
            <p className="text-xl text-gray-600">
              {posts.length}件の記事が見つかりました
            </p>
            <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mt-8 rounded-full" />
          </div>
        )}

        {posts.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-24 px-6 bg-white rounded-3xl border border-gray-200 shadow-sm">
              <p className="text-xl text-gray-700 mb-3 font-medium">
                記事が見つかりませんでした
              </p>
              <p className="text-gray-500 text-lg">
                検索条件を変更して、再度お試しください
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <PrivatePostCard post={post} />
                </div>
              </div>
            ))}
          </div>
        )}
        <Button className="fixed bottom-10 right-10 w-18 h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-0">
          <Link
            href="/manage/posts/create"
            className="flex items-center justify-center w-full h-full"
          >
            <span className="text-white text-2xl md:text-3xl">＋</span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
