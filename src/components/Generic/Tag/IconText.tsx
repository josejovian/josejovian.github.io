import clsx from "clsx";
import { HTMLProps, ReactNode } from "react";

interface IconTextProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export function IconText({ className, children, ...props }: IconTextProps) {
  return (
    <div
      className={clsx("flex gap-2 items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
