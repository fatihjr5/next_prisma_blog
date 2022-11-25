import React, {useState} from "react";
import PostLayout from "../component/PostLayout";
import Router from "next/router";
import Link from "next/link";

const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryName] = useState('');
    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const body = { title, content, categoryId };
            await fetch('/api/post', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            console.log(body)
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <PostLayout>
            <form onSubmit={submitData} className="flex flex-col">
                <input className="w-96 mx-auto border border-gray-400" type="text" onChange={(e)=> setTitle(e.target.value)} value={title} placeholder="enter"/>
                <textarea className="w-96 mx-auto border border-gray-400"  onChange={(e)=> setContent(e.target.value)} value={content} placeholder="enter"/>
                <select onChange={(e)=> setCategoryName(e.target.value)}>
                    <option value='1'>ko</option>
                    <option value='2'>ok</option>
                </select>
                <div className="flex flex-row gap-x-4 justify-center">
                    <input disabled={!content || !title || !categoryId} className={!categoryId|| !content || !title ? `hidden`: ``} type="submit" value="create" />
                    <Link href="#" onClick={()=> Router.push("/")}>Cancel</Link>
                </div>
            </form>
        </PostLayout>
    )
}
export default Draft
