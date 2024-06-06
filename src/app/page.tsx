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
        <main className="posts-page">
                {posts.length === 0 ? (
                    <p>No posts</p>
                ) : (
                    posts.map(post => (
                        <section key={post.id} className="post-card">

                            <div className="mb-4 post-header">

                                <Link href={`/posts/${post.id}`}>
                                    <h1 className="post-header-text font-semibold">
                                        {post.title}
                                    </h1>
                                </Link>
                                <div className="post-buttons-div">
                                  <Link href={`/posts/${post.id}`} className="h-6 w-6 post-button">
                                    <EyeIcon />
                                  </Link>
                                  <Link href={`/posts/${post.id}/edit`} className="h-6 w-6 post-button">
                                    <PencilAltIcon />
                                  </Link>
                                  <PostDelete id={post.id} />
                                </div>

                            </div>
                                {/* <p className={`m-0 max-w-[30ch] text-sm opacity-100`}>
                                    {post.content}
                                </p> */}
                            <div className="text-sm opacity-100">
                                {'Updated at ' + new Date(post.updatedAt).toLocaleDateString("en-US", dateOptions)}
                            </div>
                        </section>
                    ))
                )}
        </main>
    );
}