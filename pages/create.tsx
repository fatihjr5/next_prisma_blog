import React, {useState} from "react";
import type { GetStaticProps } from "next";
import PostLayout from "../component/PostLayout";
import Router from "next/router";
import Link from "next/link";
import { prisma } from "../lib/prisma";
export type CategoryProps = {
    id: string;
    name: string;
    content: string;
    isActive: boolean;
  };
export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.category.findMany({
      where: { isActive: true }
    });
    return {
      props: { feed },
      revalidate: 10,
    };
  };
  type Props = {
    feed : CategoryProps[]
  }
  
const Draft: React.FC<Props> = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('1');

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
                <select onChange={(e)=> setCategoryId(e.target.value)}>
                    {props.feed.map((category)=>(
                        <option value={category.id}>{category.name}</option>
                    ))}
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
