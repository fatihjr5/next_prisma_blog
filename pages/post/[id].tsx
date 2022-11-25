import React from 'react';
import { GetServerSideProps } from 'next';
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
        select: {id: true}
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

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <PostLayout>
      <div>
        <div className="flex flex-col mb-4">
          <h2 className="text-2xl lg:text-4xl font-bold">{title}</h2>
          <p>By {props.author?.name || "Unknown author"}</p>
        </div>
        <p className="text-base font-normal text-gray-700">{props.content}</p>
        {!props.published && userHasValidSession && postBelongsToUser && (
            <button onClick={()=> publishPost(props.id)} className="text-black">Publish</button>
          )
        }

        {
          userHasValidSession && postBelongsToUser && (
            <button onClick={() => deletePost(props.id)}>Delete</button>
          )
        }
      </div>
    </PostLayout>
  );
};

export default Post;