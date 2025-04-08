import Footer from "@/components/layouts/Footer";
import PrivateHeader from "@/components/layouts/PrivateHeader";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <PrivateHeader />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
