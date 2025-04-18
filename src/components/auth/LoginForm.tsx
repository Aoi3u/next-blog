"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions/authenticate";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <Card className="w-full mx-auto max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ログイン
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          アカウントにサインインして始めましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              メールアドレス
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50"
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                パスワード
              </Label>
            </div>
            <Input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50"
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:cursor-pointer text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                ログイン中...
              </div>
            ) : (
              "ログイン"
            )}
          </Button>

          {errorMessage && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-100">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          <div className="pt-4">
            <p className="text-sm text-gray-600 text-center">
              アカウントをお持ちでない方は
              <Link
                href="/register"
                className="text-indigo-600 hover:text-indigo-500 font-semibold ml-1 transition-colors"
              >
                新規登録
              </Link>
            </p>
            <Link
              href="/"
              className="inline-block mt-6 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← ホーム画面へ戻る
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
