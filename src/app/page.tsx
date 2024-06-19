import { fetchPosts } from "@/db/queries/posts";
import Link from "next/link";
import { PencilAltIcon, EyeIcon } from "@heroicons/react/solid";
import PostDelete from "@/components/post-delete";
import { useSession } from "next-auth/react";

export default async function Home() {
  const posts = await fetchPosts();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" && <p>Welcome, {session?.user?.email}!</p>}
      {posts.length === 0 ? (
        <p className="text-center text-white-500">No posts</p>
      ) : (
        posts.map((post) => (
          <section key={post.id} className="post-card mb-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <div className="p-3">
                <h1 className="text-xl font-semibold text-blue-600">{post.title}</h1>
                <div className="text-sm text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString(undefined, dateOptions)}
                </div>
              </div>
              <div className="flex">
                <Link href={`/posts/${post.id}/edit`} className="px-3">
                  <PencilAltIcon className="w-5 h-5 text-gray-500" />
                </Link>
                <Link href={`/posts/${post.id}`} className="px-3">
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                </Link>
                <PostDelete id={post.id} />
              </div>
            </div>
            <hr />
            <p className="p-3 text-gray-700">{post.content}</p>
          </section>
        ))
      )}
    </>
  );
}
