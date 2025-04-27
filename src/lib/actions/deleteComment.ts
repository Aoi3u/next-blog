"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";

type ActionState = {
  success: boolean;
  message?: string;
};

export async function deleteComment(commentId: string): Promise<ActionState> {
  try {
    // セッション確認
    const session = await auth();
    const userId = session?.user?.id;
    if (!session?.user?.email || !userId) {
      throw new Error("不正なリクエストです");
    }

    // コメントの存在確認と権限チェック
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { author: true },
    });

    if (!comment) {
      return {
        success: false,
        message: "コメントが見つかりません",
      };
    }

    // コメント投稿者本人のみ削除可能
    if (comment.authorId !== userId) {
      return {
        success: false,
        message: "削除権限がありません",
      };
    }

    // コメント削除
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return {
      success: true,
      message: "コメントを削除しました",
    };
  } catch (error) {
    console.error("Comment deletion error:", error);
    return {
      success: false,
      message: "コメントの削除に失敗しました",
    };
  }
}