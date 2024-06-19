import { updatePost } from "@/app/actions/posts";
import PostForm from "@/components/post-form";
import { fetchPostById } from "@/db/queries/posts";
import RequireAuth from "@/components/require-auth";

interface PostsEditProps {
  params: {
    id: string;
  };
}

export default async function PostsEdit({ params }: PostsEditProps) {
  const { id } = params;
  const post = await fetchPostById(id);
  const updateAction = updatePost.bind(null, id);

  return (
    <RequireAuth>
      <div className="post-form-div text-center p-4 shadow-md rounded-lg">
        <PostForm formAction={updateAction} initialData={{ title: post?.title ?? '', content: post?.content ?? '' }} />
      </div>
    </RequireAuth>
  );
}
