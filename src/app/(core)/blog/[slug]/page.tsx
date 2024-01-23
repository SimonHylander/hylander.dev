import { getPost } from "~/utils/posts";

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);
  // todo randomize tag color like dev.to

  return (
    <>
      <section
        className={`relative z-0 mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-10 sm:px-16 sm:pb-32`}
      >
        <header className="flex flex-col gap-2 pt-20">
          <h1
            className={`flex flex-col gap-2 truncate text-4xl font-bold text-red-100 transition-opacity duration-700 ease-in-out`}
          >
            {post.title}
          </h1>

          <p className="truncate text-xl font-semibold">{post.description}</p>
          <time className="text-sm">Published: 2023-10-15</time>
        </header>

        <article className="text-lg">
          <h2 className="hidden">Introduction</h2>

          {post?.tags?.map((tag, index) => (
            <div key={index} className="text-xs">
              #{tag}
            </div>
          ))}

          <div
            className="flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </section>
    </>
  );
};

export default Post;
