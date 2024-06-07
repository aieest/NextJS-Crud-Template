import { fetchPostById } from "@/db/queries/posts";
import Link from "next/link";
import { PencilAltIcon, HomeIcon } from "@heroicons/react/solid";
import PostDelete from "@/components/post-delete";

interface PostReadProps {
    params: { id: string };
}

const PostRead = async ({ params }: PostReadProps) => {
    const { id } = params;
    const post = await fetchPostById(id);

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <main className="flex min-h-screen flex-col items-start p-24">
            <Link href="/">
                <HomeIcon className="h-6 w-6 text-blue-600" />
            </Link>
            {post === null ? (
                    <p>Post Does Not Exist</p>
                ) : (
            <div key={post.id}>
                <div className="mb-4">
                    <Link href={`/posts/${post.id}`}>
                        <h2 className="mb-3 text-2xl font-semibold">{post.title}</h2>
                    </Link>
                    <p className="m-0 max-w-[30ch] text-sm opacity-100">{post.content}</p>
                </div>
                <div className="text-sm opacity-100">
                    {'Updated at ' + new Date(post.updatedAt).toLocaleDateString("en-US", dateOptions)}
                </div>
                <Link href={`/posts/${post.id}/edit`} passHref>
                    <PencilAltIcon className="h-6 w-6 text-blue-600" />
                </Link>


                <PostDelete id={post.id} />
            </div>
                )}
        </main>
    );
};

export default PostRead;
