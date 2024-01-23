import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/blog");

type PostData = {
  title: string;
  description: string;
  date: string;
  tags: string[]
};

export function getSortedPostsData() {
  const allPostsData = fs.readdirSync(postsDirectory).map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as PostData),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPost(slug: string) {
  const fileContents = fs.readFileSync(`${postsDirectory}/${slug}.md`, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id: slug.replace(/\.md$/, ""),
    contentHtml,
    ...(matterResult.data as PostData),
  };
}
