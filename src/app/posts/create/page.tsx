import { createPost } from "@/app/actions/posts";
import PostForm from "@/components/post-form";

export default function PostsCreate() {
    return (
        <>
            <div className="post-form-div text-center p-6 shadow-md rounded-lg">
                <PostForm formAction={createPost} initialData={{ title: '', content: '' }} />
            </div>
        </>
    );
}