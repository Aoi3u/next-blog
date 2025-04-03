import { getOwnPosts } from "@/lib/ownPost";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import PostDropDownMenu from "@/components/post/PostDropDownMenu";

export default async function DashBoardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }

  const posts = await getOwnPosts(userId);
  console.log(posts);
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
        <Button>新規記事作成</Button>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">タイトル</th>
            <th className="border p-2 text-center">表示 / 非表示</th>
            <th className="border p-2 text-center">更新日時</th>
            <th className="border p-2 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2 text-center">
                {post.published ? "表示" : "非表示"}
              </td>
              <td className="border p-2 text-center">
                {new Date(post.updatedAt).toLocaleString()}
              </td>
              <td className="border p-2 text-center">
                <PostDropDownMenu postId={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
