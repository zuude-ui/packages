"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";
import { cn } from "../lib/utils";
import { CompPreview } from "./comp-preview";

const components = {
  h1: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-5xl font-black tracking-tighter" {...props}>
      {children}

      <svg
        viewBox="0 0 16 16"
        height="0.7em"
        width="0.7em"
        className="hidden group-hover:block"
      >
        <g strokeWidth="1.2" fill="none" stroke="currentColor">
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
          ></path>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
          ></path>
        </g>
      </svg>
    </h1>
  ),
  h2: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-3xl mb-8 mt-20 first-of-type:mt-0 font-black [&>a]:font-black tracking-tighter"
      {...props}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        height="0.6em"
        width="0.6em"
        className="hidden group-hover:block"
      >
        <g strokeWidth="1.2" fill="none" stroke="currentColor">
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
          ></path>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
          ></path>
        </g>
      </svg>
    </h2>
  ),
  h3: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl mb-8 mt-10 first-of-type:mt-0 font-medium"
      {...props}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        height="0.6em"
        width="0.6em"
        className="hidden group-hover:block"
      >
        <g strokeWidth="1.2" fill="none" stroke="currentColor">
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
          ></path>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
          ></path>
        </g>
      </svg>
    </h3>
  ),
  h4: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="group hover:text-primary-hover [&_a:hover]:text-primary-hover mt-[1.6rem] mb-[0.6rem] flex scroll-m-12 items-center gap-2 font-medium [&_a]:text-inherit [&_code]:text-[21px] [&+p]:mt-0!"
      {...props}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        height="0.6em"
        width="0.6em"
        className="hidden group-hover:block"
      >
        <g strokeWidth="1.2" fill="none" stroke="currentColor">
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
          ></path>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
          ></path>
        </g>
      </svg>
    </h4>
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <p className="mb-3" {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="scroll-m-20 pl-8 text-base leading-7" {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="relative my-2 before:absolute before:top-3 before:h-px before:w-[6.8px] before:-translate-x-5 before:bg-[#888]"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-code rounded-md border px-[0.25rem] py-[0.12rem] text-sm text-orange-700 dark:text-orange-500"
      {...props}
    ></code>
  ),
  blockquote: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="bg-background my-2 space-y-2 rounded-xl border p-3"
      {...props}
    >
      <p className="flex items-center gap-1 text-sm font-medium capitalize">
        {/* {infoIcon} */}
        Note
      </p>
      <p className="text-200 text-sm">{children}</p>
    </blockquote>
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div
      className="mt-4 mb-2 w-full overflow-auto rounded-xl border"
      data-table
    >
      <table
        className={cn("w-full text-sm [&_code]:text-[12.25px]", className)}
        {...props}
      />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className={cn("bg-contrast-high/5 w-full [&_tr]:border-t-0", className)}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("bg-background min-h-[41px] border-t", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn("bg-card px-4 py-2 text-left font-medium", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "[&:not(:first-child)]:text-200 px-4 py-2 text-left text-xs whitespace-nowrap",
        "",
        className
      )}
      {...props}
    />
  ),
  // START - Code Syntax Highlighter
  figure: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {}) => {
    const [showCopyButton, setShowCopyButton] = useState(false);
    const figureRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (!figureRef.current?.querySelector("figcaption")) {
        setShowCopyButton(true);
      }
    }, [figureRef.current]);

    return (
      <div className="relative" data-code-block>
        {/* {showCopyButton && (
          <CopyButton
            value={figureRef.current?.querySelector("pre")?.textContent || ""}
            className="absolute top-2 right-2 left-2 z-10 mb-[-32px] ml-auto flex"
          />
        )} */}

        <figure
          ref={figureRef}
          className={cn(
            "group bg-background relative max-h-[400px] w-full overflow-auto rounded-2xl border shadow-sm **:data-line:px-[20px] dark:bg-neutral-900 [&_code]:rounded-none [&_code]:border-none [&_code]:bg-transparent! [&_code]:px-0 [&_code]:py-[20px] [&_code]:text-[13px]"
          )}
          {...props}
        >
          {children}
        </figure>
      </div>
    );
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {}) => {
    const copyTextRef = useRef<HTMLPreElement>(null);
    const [_, setIsMounted] = useState(false);

    useEffect(() => {
      if (copyTextRef.current) {
        setIsMounted(true);
      }
    }, []);

    return (
      <figcaption
        ref={copyTextRef}
        className="sticky top-0 left-0 z-10 flex h-[48px] items-center gap-2 border-b bg-inherit pr-3 pl-4 text-[13px]"
        {...props}
      >
        {/* <TechIcons
          // @ts-ignore
          name={props["data-language"]}
          className=""
        /> */}
        <span className="inline-block grow">
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                copyTextRef.current?.querySelector("span")
                  ?.textContent as string
              )
            }
            className="hover:opacity-80 active:scale-95"
            title="Copy"
          >
            {children}
          </button>
        </span>
        {/* {copyTextRef.current && (
          <CopyButton
            value={copyTextRef.current?.nextElementSibling?.textContent || ""}
          />
        )} */}
      </figcaption>
    );
  },
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement> & {}) => {
    return (
      <>
        <pre {...props} />
      </>
    );
  },
  // END - Code Syntax Highlighter
  a: ({ className, href, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      href={href}
      target={
        typeof href === "string" && href.startsWith("https")
          ? "_blank"
          : undefined
      }
      className={cn("", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<typeof Image>) => (
    <Image
      className={cn("my-8 rounded-md", className)}
      width={800}
      height={800}
      alt={alt}
      {...props}
    />
  ),
  CompPreview,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="relative flex flex-col max-w-4xl text-start w-full">
      <Component components={components} />
    </div>
  );
}
