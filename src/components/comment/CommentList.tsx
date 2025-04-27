import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Comment } from "@/types/comment";

type CommentListProps = {
  comments: Comment[];
};

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-gray-500">まだコメントはありません。</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white p-6 rounded-lg border border-gray-100 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {comment.author.name[0]?.toUpperCase()}
                </span>
              </div>
              <span className="font-medium text-gray-900">
                {comment.author.name}
              </span>
            </div>
            <time className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}