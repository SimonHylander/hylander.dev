import Link from "next/link";
import LeftNavigation from "../_components/navigation/left-navigation";
import { Footer } from "../_components/footer/Footer";

const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export default async function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative z-50 flex max-w-7xl flex-col gap-4 px-6 sm:px-16 ">
        <nav
          className={`fixed top-0 flex w-full justify-between bg-transparent py-4 `}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="relative">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="h-12 w-12 object-contain"
                />
              </Link>

              <LeftNavigation />
            </div>

            <ul className="hidden list-none flex-row gap-10 sm:flex">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`cursor-pointer text-[18px] font-medium text-red-200 hover:text-red-300`}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {children}

      <Footer />
    </>
  );
}
