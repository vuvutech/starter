"use client";

import Link, { LinkProps } from "next/link";

import { useRouter } from "next/navigation";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const TransitionLink = ({
  children,
  href,
  key,
  className,
}: {
  children: React.ReactNode;
  href: string;
  key?: string;
  className?: string;
}) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = document.querySelector("body");

    body?.classList.add("page-transition");

    await sleep(500);

    router.push(href);

    body?.classList.remove("page-transition");
  };

  return (
    <Link href={href} onClick={handleTransition} className={className}>
      {children}
    </Link>
  );
};

export default TransitionLink;
