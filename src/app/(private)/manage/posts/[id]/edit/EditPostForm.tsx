"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useActionState, useEffect } from "react";
import { updatePost } from "@/lib/actions/updatePost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    content: string;
    topImage?: string | null;
    published: boolean;
  };
};

export default function EditPostForm({ post }: EditPostFormProps) {
  const [content, setContent] = useState(post.content);
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);
  const [imagePreview, setImagePreview] = useState(post.topImage);

  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {},
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== post.topImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, post.topImage]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
            記事の編集
          </h1>

          <form action={formAction} className="space-y-8">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-gray-700 font-semibold inline-block"
              >
                タイトル
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="魅力的なタイトルを入力してください"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              />
              {state.errors.title && (
                <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                  <svg
                    className="w-4 h-4 mr-1.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {state.errors.title.join(",")}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label
                htmlFor="topImage"
                className="text-gray-700 font-semibold inline-block"
              >
                表示画像
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  id="topImage"
                  accept="image/*"
                  name="topImage"
                  onChange={handleImageChange}
                  className="w-full border-2 border-dashed border-gray-200 rounded-lg px-4 py-8 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
              </div>
              {imagePreview && (
                <div className="mt-4 relative group">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={imagePreview}
                      alt={post.title}
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="w-full max-w-[400px] rounded-lg transform transition-transform group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <Label
                  htmlFor="content"
                  className="text-gray-700 font-semibold"
                >
                  内容
                </Label>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {contentLength} 文字
                </span>
              </div>
              <div className="relative">
                <TextareaAutosize
                  id="content"
                  name="content"
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:bg-white font-mono text-gray-800"
                  placeholder="# Markdown形式で記事を書いてみましょう"
                  minRows={12}
                  value={content}
                  onChange={handleContentChange}
                />
              </div>
            </div>
            <div className="bg-gray-50/70 p-6 rounded-xl border border-gray-100">
              <Label className="text-gray-700 font-semibold mb-4 block">
                公開設定
              </Label>
              <RadioGroup
                value={published.toString()}
                name="published"
                onValueChange={(value) => setPublished(value === "true")}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 transition-colors hover:bg-white p-2 rounded-lg">
                  <RadioGroupItem value="true" id="published-one" />
                  <Label
                    htmlFor="published-one"
                    className="text-sm cursor-pointer"
                  >
                    公開
                  </Label>
                </div>
                <div className="flex items-center space-x-3 transition-colors hover:bg-white p-2 rounded-lg">
                  <RadioGroupItem value="false" id="published-two" />
                  <Label
                    htmlFor="published-two"
                    className="text-sm cursor-pointer"
                  >
                    非公開
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between pt-8 border-t">
              <Button
                asChild
                variant="outline"
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
              >
                <Link href="/manage" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  作成記事一覧に戻る
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPreview(!preview)}
                  className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                >
                  {preview ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                  {preview ? "プレビューを閉じる" : "プレビュー表示"}
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                  </svg>
                  更新する
                </Button>
              </div>
            </div>

            {preview && (
              <div className="mt-8 border rounded-xl p-8 bg-gray-50/50 backdrop-blur-sm animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
                  プレビュー
                </h2>
                <div className="prose prose-indigo prose-lg max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    skipHtml={false}
                    unwrapDisallowed={true}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
            <input type="hidden" name="postId" value={post.id} />
            <input
              type="hidden"
              name="oldImageUrl"
              value={post.topImage || ""}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
