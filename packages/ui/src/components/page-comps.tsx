import React from "react";
import { cn } from "../lib/utils";

const PageComp = ({ children }: { children: React.ReactNode }) => {
  return <div className="">{children}</div>;
};

const Heading1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-4xl font-black tracking-tighter">{children}</h1>;
};

const Heading2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-3xl mb-8 font-black tracking-tighter">{children}</h2>
  );
};

const Paragraph = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-muted-foreground mt-6 max-w-xl", className)}>
      {children}
    </p>
  );
};

const Presentation = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full mt-12 mb-16">{children}</div>;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-4xl my-12 w-full mx-auto text-start">{children}</div>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-20 w-full mx-auto text-start relative">{children}</div>
  );
};

// ** Icons

const CustomArrow = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      className={cn("size-56 rotate-y-180 text-muted-foreground", className)}
    >
      <g
        strokeWidth="9"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(0.6946583704589974,0.7193398003386511,-0.7193398003386511,0.6946583704589974,431.8725719518615,-165.59926831905932)"
      >
        <path
          d="M272.92283630371094 122.38424682617188Q-129.07716369628906 395.3842468261719 479.92283630371094 329.3842468261719Q-121.07716369628906 899.3842468261719 686.9228363037109 536.3842468261719 "
          markerEnd="url(#SvgjsMarker7007)"
          markerStart="url(#SvgjsMarker7008)"
        ></path>
      </g>
      <defs>
        <marker
          markerWidth="5"
          markerHeight="5"
          refX="2.5"
          refY="2.5"
          viewBox="0 0 5 5"
          orient="auto"
          id="SvgjsMarker7007"
        >
          <polygon points="1,5 0,2.5 1,0 5,2.5" fill="currentColor"></polygon>
        </marker>
        <marker
          markerWidth="5"
          markerHeight="5"
          refX="2.5"
          refY="2.5"
          viewBox="0 0 5 5"
          orient="auto"
          id="SvgjsMarker7008"
        >
          <polygon points="0,2.5 4,0 5,2.5 4,5" fill="currentColor"></polygon>
        </marker>
      </defs>
    </svg>
  );
};

interface TableProps {
  columns: { body: string[]; values: string[][] }[];
}

const Table = ({ columns }: TableProps) => {
  return (
    <div className="overflow-auto rounded-md border">
      <table className="w-full">
        <thead className="bg-muted">
          {columns.map((column, index) => (
            <tr key={index}>
              {column.body.map((header, i) => (
                <th
                  key={i}
                  className="border-b py-3 px-4 text-left font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {columns.map((column, index) =>
            column.values.map((row, i) => (
              <tr key={`${index}-${i}`}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="border-b text-muted-foreground py-3 whitespace-nowrap px-4 text-sm"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const ExampleWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mt-12 flex items-center justify-center border rounded-xl overflow-hidden px-4 py-8",
        className
      )}
    >
      {children}
    </div>
  );
};

PageComp.Presentation = Presentation;
PageComp.Wrapper = Wrapper;
PageComp.Section = Section;
PageComp.Heading1 = Heading1;
PageComp.Heading2 = Heading2;
PageComp.Paragraph = Paragraph;
PageComp.CustomArrow = CustomArrow;
PageComp.Table = Table;
PageComp.ExampleWrapper = ExampleWrapper;

export { PageComp };
