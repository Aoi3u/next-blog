"use client";

import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { createComment } from "@/lib/actions/createComment";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  postId: string;
};

export default function CommentForm({ postId }: CommentFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(createComment, {
    success: false,
    errors: {},
  });

  const handleSubmit = async (formData: FormData) => {
    try {
      await formAction(formData);
      router.refresh();
    } catch (error) {
      console.error("Comment submission error:", error);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {state.errors._form && (
        <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{state.errors._form[0]}</p>
        </div>
      )}

      <div>
        <TextareaAutosize
          name="content"
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
          placeholder="コメントを入力..."
          minRows={3}
          required
        />
        {state.errors.content && (
          <p className="text-red-500 text-sm mt-1">{state.errors.content[0]}</p>
        )}
      </div>
      <input type="hidden" name="postId" value={postId} />
      <Button
        type="submit"
        className="bg-gradient-to-r hover:cursor-pointer from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
      >
        コメントを投稿
      </Button>
    </form>
  );
}
