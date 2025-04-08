import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { Session } from "next-auth";
import Link from "next/link";

export default function Setting({ session }: { session: Session }) {
  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-3 px-4 py-3 rounded-full hover:bg-gray-100/80 text-black transition-all duration-300 ease-in-out"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
            {session.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <span className="font-medium">{session.user?.name}</span>
          <svg
            className="w-4 h-4 text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 p-2 bg-white rounded-xl shadow-lg border border-gray-100/50 backdrop-blur-sm"
      >
        <div className="px-4 py-3 bg-gray-50/50 rounded-lg mb-2">
          <p className="text-sm font-semibold text-gray-900">
            {session.user?.name}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{session.user?.email}</p>
        </div>

        <DropdownMenuItem className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
          <Link href={`/dashboard`} className="flex items-center w-full">
            <svg
              className="w-4 h-4 mr-3 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-medium">ダッシュボード</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
          <Link href={`/manage`} className="flex items-center w-full">
            <svg
              className="w-4 h-4 mr-3 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <span className="font-medium">記事管理</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 border-gray-100" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="font-medium">ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
