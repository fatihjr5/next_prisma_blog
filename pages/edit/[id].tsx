import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import type { GetStaticProps } from "next";
import { CategoryProps } from '../create';
import Router from 'next/router';
import PostLayout from '../../component/PostLayout';
import { PostProps } from '../../component/Post';
import { useSession } from 'next-auth/react';
import {prisma} from '../../lib/prisma';


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: {name: true, email: true}
      },
      category: {
        select: {id: true, name: true}
      }
    },
  });
  return {
    props: post,
  };
};

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.category.findMany({
      where: { isActive: true }
    });
    return {
      props: { feed },
      revalidate: 10,
    };
  };
const Post: React.FC<{post :PostProps, }> = (props) => {
  const { data: session, status } = useSession();
  const [newTitle, setNewTitle] = useState(props.post.title)
  const [newContent, setNewContent] = useState(props.post.content)
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.post.author?.email;
  let title = props.post.title;
  if (!props.post.published) {
    title = `${title} (Draft)`;
  }

  console.log(props)
  return (
    <PostLayout>
      <div>
        <div className="flex flex-col mb-4">
          <textarea value={newTitle} onChange={(e)=> setNewTitle(e.target.value)}  className="text-2xl lg:text-4xl font-bold"/>
          <p>By {props.post.author?.name || "Unknown author"}</p>
        </div>
        
        <textarea value={newContent} onChange={(e)=> setNewContent(e.target.value)} className="text-base font-normal text-gray-700"/>
        {userHasValidSession && postBelongsToUser && (
            <button onClick={()=> publishPost(props.post.id)} className="text-black">Edit</button>
          )
        }
        {
          userHasValidSession && postBelongsToUser && (
            <button onClick={() => deletePost(props.post.id)}>Delete</button>
          )
        }
      </div>
    </PostLayout>
  );
};

export default Post;