'use client'

import Link from "next/link"
import { useFormState } from "react-dom"

interface FormErrors{
    title?: string[],
    content?: string[],
}

interface FormState {
    errors: FormErrors,
}

interface PostFormProps {
    formAction: any,
    initialData: { 
        title: string,
        content: string,
    },
}

export default function PostForm({ formAction, initialData }: PostFormProps) {

    const [formState, action] = useFormState<FormState>(formAction, {
        errors: {},
    })

    return <>
        <h1 className="post-form-header text-3xl font-bold mb-3">{initialData.title ? 'Update' : 'Create'} Post</h1>
        <form action={action}>
                <div className="mb-4">
                    <input type="text" id="title" name="title" defaultValue={initialData.title} className="rounded p-2 post-form-input" placeholder="Title"/>
                    {
                        formState.errors.title
                        && <div className="text-red-500">
                            {formState.errors.title?.join(', ')}
                        </div>
                    }
                </div>
                <div className="mb-4">
                    <textarea id="content" name="content" defaultValue={initialData.content} className="rounded p-2 post-form-input" placeholder="Content"></textarea>
                    {
                        formState.errors.content
                        && <div className="text-red-500">
                            {formState.errors.content?.join(', ')}
                        </div>
                    }
                </div>
                <div className="post-form-button-div">
                    <button type="submit" className="post-form-save font-semibold rounded-md">Save</button>
                    <Link href="/" className="post-form-cancel font-semibold">Cancel</Link>
                </div>
        </form>
    </>
}