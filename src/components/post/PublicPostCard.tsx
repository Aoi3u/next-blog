import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCardProps } from "@/types/post";
import Link from "next/link";
import Image from "next/image";

export default function PublicPostCard({ post }: PostCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 pt-0 border border-gray-100">
      <Link href={`/posts/${post.id}`}>
        {post.topImage ? (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg" />
        )}
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-indigo-500 transition-colors duration-200">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-4">
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed overflow-hidden relative">
            {post.content}
            <span className="absolute bottom-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent" />
          </p>
          <div className="flex items-center justify-between text-xs pt-4 border-t border-gray-100">
            {" "}
            <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              <svg
                className="w-4 h-4 mr-1.5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              {post.author.name}
            </span>
            <time className="flex items-center text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
