import Router from "next/router";
export type PostProps = {
  image: any;
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  };
  categoryId: string
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  console.log(post)
  return (
    <div onClick={() => Router.push("/post/[id]", `/post/${post.id}`)} className="p-4 cursor-pointer">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <h1>{post.categoryId}</h1>
      <p className="text-base font-normal text-gray-400">{post.content}</p>
      <small>By {authorName}</small>
    </div>
  );
};

export default Post;
