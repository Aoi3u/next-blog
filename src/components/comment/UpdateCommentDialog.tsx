"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { updateComment } from "@/lib/actions/updateComment";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditCommentDialogProps = {
  commentId: string;
  initialContent: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditCommentDialog({
  commentId,
  initialContent,
  isOpen,
  onOpenChange,
}: EditCommentDialogProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);

    const result = await updateComment(
      commentId,
      { success: false, errors: {} },
      formData
    );

    if (result.success) {
      router.refresh();
      onOpenChange(false);
    } else {
      setError(result.errors._form?.[0] || "更新に失敗しました");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            コメントの編集
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <TextareaAutosize
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            placeholder="コメントを入力..."
            minRows={3}
            required
          />
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
            >
              更新する
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
