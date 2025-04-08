import { writeFile } from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function saveImage(file: File): Promise<string | null> {
  const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === "true";

  if (useSupabase) {
    return await saveImageToSupabase(file);
  } else {
    return await saveImageToLocal(file);
  }
}

async function saveImageToSupabase(file: File): Promise<string | null> {
  // オリジナルのファイル拡張子を取得
  const fileExt = file.name.split(".").pop();
  // ファイル名を英数字のみに設定（タイムスタンプとランダム文字列を使用）
  const fileName = `${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("next-blog-bucket")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }
  const { data: publicUrlData } = supabase.storage
    .from("next-blog-bucket")
    .getPublicUrl(fileName);
  return publicUrlData.publicUrl;
}

export async function saveImageToLocal(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), "public/images");

  try {
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (error) {
    console.error("画像保存エラー: ", error);
    return null;
  }
}
