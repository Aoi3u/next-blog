"use client";

import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Comment } from "@/types/comment";
import { useState } from "react";
import DeleteCommentDialog from "./DeleteCommentDialog";
import EditCommentDialog from "./UpdateCommentDialog";

type CommentListProps = {
  comments: Comment[];
  currentUserId?: string | null;
};

export default function CommentList({
  comments,
  currentUserId,
}: CommentListProps) {
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

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
            <div className="flex items-center space-x-4">
              <time className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: ja,
                })}
              </time>
              {currentUserId === comment.authorId && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingComment(comment)}
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedComment(comment.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">{comment.content}</p>
        </div>
      ))}

      {selectedComment && (
        <DeleteCommentDialog
          commentId={selectedComment}
          isOpen={!!selectedComment}
          onOpenChange={(open) => {
            if (!open) setSelectedComment(null);
          }}
        />
      )}

      {editingComment && (
        <EditCommentDialog
          commentId={editingComment.id}
          initialContent={editingComment.content}
          isOpen={!!editingComment}
          onOpenChange={(open) => {
            if (!open) setEditingComment(null);
          }}
        />
      )}
    </div>
  );
}
