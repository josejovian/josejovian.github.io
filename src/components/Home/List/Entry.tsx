import clsx from "clsx";
import { Fragment, useMemo } from "react";
import { MdSchool, MdGroups } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import { Picture } from "@/src/components";
import { ListEntryCategoryType, ListEntryType } from "@/src/types";

export interface ListEntryProps extends ListEntryType {
  idx: number;
  maxIdx: number;
}

function getEntryIcon(input: ListEntryCategoryType) {
  switch (input) {
    case "education":
      return <MdSchool />;
    case "organization":
      return <MdGroups />;
    case "work":
      return <BsBriefcaseFill />;
    default:
      return <></>;
  }
}

function alternate(idx: number, a: string | string[], b: string | string[]) {
  return idx % 2 === 1 ? a : b;
}

export function ListEntry({
  idx,
  maxIdx,
  name,
  addon,
  type,
  description,
  attachments,
}: ListEntryProps) {
  const renderEntryDot = useMemo(
    () => (
      <div
        className={clsx(
          "List_entry-dot",
          "absolute 4 w-6 h-6",
          "bg-blue-400 rounded-full z-40",
          alternate(idx, "lg:List_entry-dot-r", "lg:List_entry-dot-l")
        )}
      />
    ),
    [idx]
  );

  const renderEntryIcon = useMemo(() => {
    return (
      type && (
        <div className={clsx("List_entry-back", "absolute top-0 right-4 z-40")}>
          {getEntryIcon(type)}
        </div>
      )
    );
  }, [type]);

  const renderEntryLineCleaner = useMemo(
    () =>
      idx === maxIdx && (
        <div
          className={clsx(
            "List_line-cleaner",
            "absolute",
            alternate(idx, "lg:right-3.5", "lg:left-3.5"),
            "w-6 bg-inherit z-30"
          )}
        />
      ),
    [idx, maxIdx]
  );

  const renderEntryDetail = useMemo(
    () => (
      <Fragment>
        <h3 className="text-xl">{name}</h3>
        <span className="text-sm dark:text-gray-300 text-gray-500">
          {addon}
        </span>
        <div>
          <div className={clsx("text-left mt-2")}>{description}</div>
        </div>
        {attachments && attachments.length > 0 && (
          <div className={clsx("flex flex-wrap gap-4 mt-4")}>
            {attachments.map((att) => {
              return (
                <div key={att.title}>
                  <Picture
                    src={att.link}
                    width={112}
                    height={63}
                    ogWidth={att.width ?? 1280}
                    ogHeight={att.height ?? 720}
                    alt={att.title}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    ),
    [addon, attachments, description, name]
  );

  return (
    <div
      className={clsx(
        "List_entry",
        "relative px-8 py-6",
        "secondary border col-text",
        "rounded-sm overflow-hidden",
        alternate(
          idx,
          ["pl-16 lg:pl-8 lg:pr-16", "lg:self-start"],
          ["lg:self-end pl-16"]
        )
      )}
    >
      {renderEntryDot}
      {renderEntryIcon}
      {renderEntryLineCleaner}
      {renderEntryDetail}
    </div>
  );
}
