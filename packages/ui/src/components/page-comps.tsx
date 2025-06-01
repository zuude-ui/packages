import React from "react";

export const Heading1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-5xl font-black tracking-tighter">{children}</h1>;
};

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-lg text-muted-foreground mt-6 max-w-xl">{children}</p>
  );
};
