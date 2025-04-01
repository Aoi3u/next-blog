"use client";

import createUser from "@/lib/actions/createUser";
import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });
  return (
    <Card className="w-full mx-auto max-w-md">
      <CardHeader>
        <CardTitle>ユーザー登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input type="text" name="name" id="name" required />
            {state.errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.name.join(",")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" name="email" id="email" required />
            {state.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.email.join(",")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input type="password" name="password" id="password" required />
            {state.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.password.join(",")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード(確認)</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
            />
            {state.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.confirmPassword.join(",")}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            ユーザー登録
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
