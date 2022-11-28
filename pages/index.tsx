import type { GetStaticProps } from "next";
import Layout from "../component/Layout";
import Post, { PostProps } from "../component/Post";
import { prisma } from "../lib/prisma";
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
      category:{
        select: {id:true}
      }
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <main className='grid grid-cols-3'>
        {props.feed.map((post) => (
          <div
            key={post.id}
            className="bg-white drop-shadow-md rounded-lg hover:scale-105 duration-200 hover:drop-shadow-lg"
          >
            <Post post={post} />
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default Blog;
