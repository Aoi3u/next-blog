import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Setting from "@/components/layouts/Setting";
import { auth } from "@/auth";

export default async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("不正なリクエストです");

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xs">
      <header className="border-b border-gray-200 bg-white/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <NavigationMenu>
              <NavigationMenuList className="space-x-8">
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex items-center">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300 ease-out ">
                          Tech Notes from Waseda
                        </span>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Setting session={session} />
          </div>
        </div>
      </header>
    </div>
  );
}
