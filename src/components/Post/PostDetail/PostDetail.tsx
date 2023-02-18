import { ReactNode } from "react";
import { IconText } from "@/src/components";

export interface PostDetailProps {
  children: ReactNode;
}

export function PostDetail({ children }: PostDetailProps) {
  return (
    <IconText className="IconText">
      <>{children}</>
    </IconText>
  );
}
