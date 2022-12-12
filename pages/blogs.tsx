import clsx from "clsx";
import { Meta, ProjectCard } from "@/src/components";
import { BlogType } from "@/src/types";
import { BlogCard } from "@/src/components/Post/BlogCard";

interface BlogsProps {
	blogs: BlogType[];
}

const Blogs = ({ blogs }: BlogsProps) => {
	return (
		<main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
			<Meta page="Blog" />
			<h1 className="text-6xl">Random Posts.</h1>
			<section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 3xl:gap-16">
				{blogs.map((blog) => {
					return <BlogCard key={blog.id} {...blog} />;
				})}
			</section>
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
