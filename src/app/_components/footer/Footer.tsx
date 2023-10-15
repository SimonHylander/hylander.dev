import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex justify-end px-4 py-4 sm:px-8">
      <div className="flex gap-4">
        <Link
          href="https://github.com/SimonHylander"
          className="flex items-center gap-2 font-bold "
          target="_blank"
          rel="noreferrer"
        >
          <i className="devicon-github-original"></i>
          Github
        </Link>

        <Link
          href="https://www.linkedin.com/in/simon-hylander-32b770157"
          className="flex items-center gap-2 font-bold "
          target="_blank"
          rel="noreferrer"
        >
          <i className="devicon-linkedin-plain"></i>
          LinkedIn
        </Link>
      </div>
    </footer>
  );
};
