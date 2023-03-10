import {
  Card,
  PostCardDescription,
  PostCardTitle,
  PostDetailAuthor,
  PostDetailDate,
} from "@/src/components";
import { contentDetailLink } from "@/src/constants";
import { BlogType } from "@/src/types";

export interface BlogCardProps extends BlogType {
  width?: number;
}

export function BlogCard({ width, ...project }: BlogCardProps) {
  const { id, title, date, overview, autoOverview } = project;

  const identifier = `BlogCard_${id}`;
  const link = contentDetailLink("blogs", id);
  const thumbnail = `${link}.png`;

  return (
    <Card
      href={link}
      id={identifier}
      thumbSrc={thumbnail}
      thumbTitle={title}
      overrideWidth={width}
    >
      <>
        <PostCardTitle>{title}</PostCardTitle>
        <div className="flex gap-4">
          <PostDetailAuthor />
          <PostDetailDate date={date} />
        </div>
        <PostCardDescription>{overview || autoOverview}</PostCardDescription>
      </>
    </Card>
  );
}
