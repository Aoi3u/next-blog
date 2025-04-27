"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { z } from "zod";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "コメントを入力してください" })
    .max(1000, { message: "コメントは1000文字以内で入力してください" }),
});

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function updateComment(
  commentId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const content = formData.get("content") as string;

    // バリデーション
    const validationResult = commentSchema.safeParse({ content });
    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // セッション確認
    const session = await auth();
    const userId = session?.user?.id;
    if (!session?.user?.email || !userId) {
      throw new Error("不正なリクエストです");
    }

    // コメントの存在確認と権限チェック
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return {
        success: false,
        errors: {
          _form: ["コメントが見つかりません"],
        },
      };
    }

    if (comment.authorId !== userId) {
      return {
        success: false,
        errors: {
          _form: ["編集権限がありません"],
        },
      };
    }

    // コメント更新
    await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    return { success: true, errors: {} };
  } catch (error) {
    console.error("Comment update error:", error);
    return {
      success: false,
      errors: {
        _form: ["コメントの更新に失敗しました"],
      },
    };
  }
}
