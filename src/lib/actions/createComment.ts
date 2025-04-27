"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { z } from "zod";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "コメントを入力してください" })
    .max(1000, { message: "コメントは1000文字以内で入力してください" }),
  postId: z.string().min(1, { message: "記事IDは必須です" }),
});

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function createComment(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const content = formData.get("content") as string;
    const postId = formData.get("postId") as string;

    // バリデーション
    const validationResult = commentSchema.safeParse({ content, postId });
    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // セッション確認
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("不正なリクエストです");
    }

    // ユーザーの存在確認（emailで検索）
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        success: false,
        errors: {
          _form: ["ユーザー情報の取得に失敗しました"],
        },
      };
    }

    // 記事の存在確認
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return {
        success: false,
        errors: {
          postId: ["指定された記事が見つかりません"],
        },
      };
    }

    // DB保存
    await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: user.id, // セッションのIDではなく、DBから取得したユーザーIDを使用
      },
    });

    return { success: true, errors: {} };
  } catch (error) {
    console.error("Comment creation error:", error);
    return {
      success: false,
      errors: {
        _form: ["コメントの投稿に失敗しました"],
      },
    };
  }
}
