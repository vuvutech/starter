


import Link from "next/link";
import TransitionLink from "./TransitionLink";
import { links } from "@/metadata";
import { Code2 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="px-4 py-8 flex items-center justify-center max-w-6xl mx-auto">
      <nav className="flex justify-between w-full">
        <ul className="flex gap-8 items-center">
          <TransitionLink href="/">
            <Code2 className="h-8 w-8" />
          </TransitionLink>

          {links.map((link) => (
            <TransitionLink
              href={link.route}
              key={link.name}
              className="font-medium text-lg hover:text-indigo-500 transition duration-500 max-md:hidden"
            >
              {link.name}
            </TransitionLink>
          ))}
        </ul>
        <button className="rounded-lg p-4 bg-gray-900 text-white font-medium text-sm">
          Sign In
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
