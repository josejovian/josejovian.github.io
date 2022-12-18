import clsx from "clsx";
import { Meta, PostGrid } from "@/src/components";
import { BlogType } from "@/src/types";

interface BlogsProps {
	blogs: BlogType[];
}

const Blogs = ({ blogs }: BlogsProps) => {
	return (
		<main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
			<Meta
				title="Blog"
				description={clsx(
					"A page listing some blog posts I write at a random time and about random things."
				)}
			/>
			<h1 className="text-6xl">Random Posts.</h1>
			<PostGrid id="blogs" contentType="blogs" contents={blogs} />
		</main>
	);
};

export const getStaticProps = async (req: any) => {
	const { getBlogs } = require("../src/lib/mdx.tsx");

	let blogs: BlogType[] = await getBlogs();

	return {
		props: { blogs: blogs },
		revalidate: 300,
	};
};

export default Blogs;
