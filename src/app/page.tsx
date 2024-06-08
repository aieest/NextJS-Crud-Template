import { fetchPosts } from "@/db/queries/posts";
import Link from "next/link";
import { PencilAltIcon, EyeIcon } from "@heroicons/react/solid";
import PostDelete from "@/components/post-delete";

export default async function Home() {
    const posts = await fetchPosts();
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return (
        <>
            {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts</p>
            ) : (
                posts.map(post => (
                    <section key={post.id} className="post-card mb-6 bg-white shadow-md rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="p-3">
                                <h1 className="text-xl font-semibold text-blue-600">
                                    {post.title}
                                </h1>
                                <div className="text-sm text-gray-500">
                                    {new Date(post.updatedAt).toLocaleDateString("en-US", dateOptions)}
                                </div>
                            </div>
                            <div className="p-3 flex space-x-2">
                                <Link href={`/posts/${post.id}`} className="post-button text-gray-600">
                                    <EyeIcon className="h-6 w-6" />
                                </Link>
                                <Link href={`/posts/${post.id}/edit`} className="post-button text-gray-600">
                                    <PencilAltIcon className="h-6 w-6" />
                                </Link>
                                <PostDelete id={post.id} />
                            </div>
                        </div>
                        {/* <p className={`m-0 max-w-[30ch] text-sm opacity-100`}>
                            {post.content}
                        </p> */}
                    </section>
                ))
            )}
        </>
    );
}
