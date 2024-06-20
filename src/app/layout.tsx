import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between p-4 bg-gray-100">
          <Link href="/posts/create" className="bg-white px-4 py-2 rounded">Create Post</Link>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span>{session.user?.name}</span>
                <button onClick={() => signOut()}>Sign Out</button>
              </>
            ) : (
              <Link href="/api/auth/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
