import { ContentType } from "../types";

export const CONTENT_LIST_PATH: Record<ContentType, string> = {
	blogs: "/blogs/",
	projects: "/projects/",
};

export const CONTENT_DETAIL_PATH: Record<ContentType, string> = {
	blogs: "/blog/",
	projects: "/project/",
};

export function contentListLink(cat: ContentType, id: string) {
	return `${CONTENT_LIST_PATH[cat]}${id}`;
}

export function contentDetailLink(cat: ContentType, id: string) {
	return `${CONTENT_DETAIL_PATH[cat]}${id}`;
}
