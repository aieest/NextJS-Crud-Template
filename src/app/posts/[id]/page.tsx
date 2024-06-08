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
        <>
            <Link href="/">
                <HomeIcon className="h-6 w-6 text-blue-600" />
            </Link>
            {post === null ? (
                    <p className="text-center text-white-500">Post Does Not Exist</p>
                ) : (
                <section key={post.id} className="post-card mb-6 bg-white shadow-md rounded-lg">
                    <div className="flex justify-between items-center p-4">
                        <div>
                            <h2 className="text-xl font-semibold text-blue-600">{post.title}</h2>
                            <p className="text-sm text-gray-500">{new Date(post.updatedAt).toLocaleDateString("en-US", dateOptions)}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Link href={`/posts/${post.id}/edit`} className="post-button text-gray-600">
                                <PencilAltIcon className="h-6 w-6" />
                            </Link>
                            <PostDelete id={post.id} />
                        </div>
                    </div>
                    <div className="p-4 text-gray-700">
                        {post.content}
                    </div>
                </section>
                )}
        </>
    );
};

export default PostRead;
