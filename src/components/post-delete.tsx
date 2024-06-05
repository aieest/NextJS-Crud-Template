'use client'

import { TrashIcon } from "@heroicons/react/solid";
import { deletePost } from "../app/actions/posts";

interface PostDeleteProps {
    id: string,
}


export default function PostDelete({ id }: PostDeleteProps) {

    const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        deletePost(id);
    };

    return <form onSubmit={deleteAction}>
        <button type="submit" className="h-6 w-6 post-button"><TrashIcon/></button>
    </form>
}