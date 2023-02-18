import clsx from "clsx";
import {
  Card,
  getTech,
  PostCardDescription,
  PostCardTitle,
} from "@/src/components";
import { contentDetailLink } from "@/src/constants";
import { ProjectType } from "@/src/types";

export interface ProjectCardProps extends ProjectType {
  width?: number;
}

export function ProjectCard({ width, ...project }: ProjectCardProps) {
  const { id, title, overview, autoOverview, techs } = project;

  const identifier = `ProjectCard_${id}`;
  const link = contentDetailLink("projects", id);
  const thumbnail = `${contentDetailLink("projects", id)}.png`;

  return (
    <Card
      href={link}
      id={identifier}
      thumbSrc={thumbnail}
      overrideWidth={width}
    >
      <>
        <PostCardTitle>{title}</PostCardTitle>
        <PostCardDescription>{overview || autoOverview}</PostCardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {techs.map((tech) => {
            return (
              <span
                key={`${title}-${tech}`}
                className={clsx(
                  "px-2",
                  "bg-gray-600 text-stone-100",
                  "dark:bg-gray-200 dark:text-stone-800",
                  "rounded-sm"
                )}
              >
                {getTech(tech).text}
              </span>
            );
          })}
        </div>
      </>
    </Card>
  );
}
