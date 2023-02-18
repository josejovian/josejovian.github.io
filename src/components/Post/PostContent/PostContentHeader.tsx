import { ContentComponentGenericProps } from "@/src/types";
import { PostContentDetail } from "./PostContentDetail";
import { PostContentTitle } from "./PostContentTitle";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostContentHeaderProps extends ContentComponentGenericProps {}

export function PostContentHeader({
  contentDetail,
  contentType,
}: PostContentHeaderProps) {
  const { title } = contentDetail;
  return (
    <div className="flex flex-col gap-4">
      <PostContentTitle>{title}</PostContentTitle>
      <PostContentDetail
        contentDetail={contentDetail}
        contentType={contentType}
      />
    </div>
  );
}
