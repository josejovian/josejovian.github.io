import { PostDetail } from "@/src/components";
import { toAltDateFormat } from "@/src/utils";
import { BsClockFill } from "react-icons/bs";

interface PostDetailDateProps {
  date: string;
}

export function PostDetailDate({ date }: PostDetailDateProps) {
  return (
    <PostDetail>
      <BsClockFill />
      <span>{toAltDateFormat(date)}</span>
    </PostDetail>
  );
}
