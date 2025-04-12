import Link from "next/link";

// const footerLinks = [
//   { name: "ホーム", href: "/" },
//   { name: "利用規約", href: "/terms" },
//   { name: "プライバシーポリシー", href: "/privacy" },
//   { name: "お問い合わせ", href: "/contact" },
// ];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-col items-center space-y-2">
          <Link href="/">
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Blog(仮)
            </span>
          </Link>

          {/* 
          <nav>
            <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Blog(仮).
          </div>
        </div>
      </div>
    </footer>
  );
}
