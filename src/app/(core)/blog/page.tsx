import { getSortedPostsData } from "~/utils/posts";

import { ArrowRight } from "lucide-react";

export default async function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <section
        className={`relative z-0 mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-10 sm:px-16 sm:pb-32`}
      >
        <div className="py-20">
          <h1 className="hidden">Articles</h1>

          <div
            className={
              "align-content-center grid grid-cols-1 items-center justify-center gap-10 md:grid-cols-2"
            }
          >
            {allPostsData.map((post, i) => (
              <div
                key={i}
                className="w-full rounded-[20px] p-[1px] shadow-card"
              >
                <div
                  className={`group flex gap-4 rounded-[20px] bg-gradient-to-r from-purple-900 to-purple-800`}
                >
                  <div className="bg-muted flex w-full max-w-[200px] bg-pink-600 text-xl text-red-100">
                    {post.title}
                  </div>

                  <header className="flex w-[300px] flex-col gap-2 py-5">
                    <time className="font-semibold">2023-10-15</time>
                    <h2
                      className={`flex flex-col gap-2 truncate text-2xl font-bold text-red-100 transition-opacity duration-700 ease-in-out`}
                    >
                      {post.title}
                    </h2>
                    <p className="truncate font-semibold">{post.description}</p>
                    <a
                      href={`/blog/${post.id}`}
                      className="flex items-center gap-1 font-semibold hover:underline"
                    >
                      Read more <ArrowRight size={20} />
                    </a>
                  </header>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
