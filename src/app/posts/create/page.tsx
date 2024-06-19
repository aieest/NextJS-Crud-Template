import { createPost } from "@/app/actions/posts";
import PostForm from "@/components/post-form";
import RequireAuth from "@/components/require-auth";

export default function PostsCreate() {
  return (
    <RequireAuth>
      <div className="post-form-div text-center p-6 shadow-md rounded-lg">
        <PostForm formAction={createPost} initialData={{ title: '', content: '' }} />
      </div>
    </RequireAuth>
  );
}
