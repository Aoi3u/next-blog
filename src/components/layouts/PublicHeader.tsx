import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function PublicHeader() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xs">
      <header className="border-b border-gray-200 bg-white/80">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex items-center">
                      <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:via-indigo-800 group-hover:to-indigo-900 transition-all duration-300 ease-out">
                        Blog(仮)
                      </span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/90 transition-colors duration-200"
                  asChild
                >
                  <Link href="/login">
                    <span className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>ログイン</span>
                    </span>
                  </Link>
                </Button>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all duration-200 ease-out hover:shadow-md"
                  asChild
                >
                  <Link href="/register">新規登録</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
