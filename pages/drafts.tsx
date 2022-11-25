// pages/drafts.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import PostLayout from '../component/PostLayout';
import Post, { PostProps } from '../component/Post';
import { prisma } from '../lib/prisma';
import Header from '../component/Header';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: {name: true}
      }
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <PostLayout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </PostLayout>
    );
  }

  return (
    <section>
        <Header/>
        <div className="px-10 lg:px-20">
            <h1 className='mt-10 text-2xl font-bold'>My Drafts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 mt-10">
                {props.drafts.map((post) => (
                  <div key={post.id} className="bg-white drop-shadow-md rounded-lg hover:scale-105 duration-200 hover:drop-shadow-lg">
                    <Post post={post} />
                  </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Drafts;
