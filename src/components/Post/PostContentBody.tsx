import { MDXContentProps } from "mdx-bundler/client";
import { FunctionComponent } from "react";
import { Picture, Side } from "@/src/components";
import { GreatSectionType } from "@/src/types";

export interface PostContentBodyProps {
	bodyPictureWidth: number;
	scroll: number;
	table: GreatSectionType[];
	Component: FunctionComponent<MDXContentProps>;
}

export function PostContentBody({
	scroll,
	table,
	bodyPictureWidth,
	Component,
}: PostContentBodyProps) {
	return (
		<div
			className="relative w-full flex gap-8"
			id="ProjectPost_body"
			style={{ flex: "1 1 auto" }}
		>
			<section className="">
				<Component
					components={{
						img: ({ src = "", width, height, alt = "" }) => {
							return (
								<Picture
									src={src}
									width={bodyPictureWidth}
									height={(bodyPictureWidth * 9) / 16}
									ogWidth={1280}
									ogHeight={720}
									alt={alt}
								/>
							);
						},
					}}
				/>
			</section>
			<Side scroll={scroll} table={table} />
		</div>
	);
}
