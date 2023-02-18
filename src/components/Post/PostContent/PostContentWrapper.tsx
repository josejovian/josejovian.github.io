import clsx from "clsx";
import { ReactNode } from "react";

export interface PostContentWrapperProps {
  children: ReactNode;
}

export function PostContentWrapper({ children }: PostContentWrapperProps) {
  return (
    <main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
      {children}
    </main>
  );
}
