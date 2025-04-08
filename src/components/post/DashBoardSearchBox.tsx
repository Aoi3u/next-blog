"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardSearchBox() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  // デバウンス
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/dashboard/?search=${debouncedSearch.trim()}`);
    } else {
      router.push("/dashboard");
    }
  }, [debouncedSearch, router]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-lg">
          <Input
            placeholder="記事を検索..."
            className="w-full px-8 py-6 bg-white/90 backdrop-blur-sm border-gray-200 hover:border-gray-300 focus:border-indigo-500 rounded-full transition-all duration-200"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}
