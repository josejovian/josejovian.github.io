import { BsPersonFill } from "react-icons/bs";
import { PostDetail } from "@/src/components";

interface PostDetailAuthorProps {}

export function PostDetailAuthor({}: PostDetailAuthorProps) {
	return (
		<PostDetail>
			<BsPersonFill />
			<span>Jose Jovian</span>
		</PostDetail>
	);
}
