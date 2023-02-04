import { bundleMDX } from "mdx-bundler";
import { BlogType, PostDetailRequestProps } from "@/src/types";
import { PostTemplate } from "@/src/components/Post/PostTemplate";

interface PageProps {
	code: string;
	frontmatter: BlogType;
}

const Blogs = ({ code, frontmatter }: PageProps) => {
	return <PostTemplate code={code} frontmatter={frontmatter} type="blogs" />;
};

export const getStaticPaths = async () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { readBlogs } = require("../../src/lib/mdx.tsx");

	const blogs = await readBlogs();

	return {
		paths: blogs.map((blog: string) => ({
			params: {
				id: blog.replace(".mdx", ""),
			},
		})),
		fallback: false,
	};
};

export const getStaticProps = async (req: PostDetailRequestProps) => {
	const { id } = req.params;

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { readBlog } = require("../../src/lib/mdx.tsx");

	const blogMD = await readBlog(id);

	const { code, frontmatter } = await bundleMDX({
		source: blogMD,
	});

	const result = {
		code,
		frontmatter: {
			id: id || null,
			...frontmatter,
		},
	};

	return {
		props: { ...result },
		revalidate: 300,
	};
};

export default Blogs;
