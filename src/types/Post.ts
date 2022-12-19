export type ContentType = "blogs" | "projects";

export interface ContentComponentGenericProps {
	contentType: ContentType;
	contentDetail: PostDescendantType;
}

export interface PostType {
	id: string;
	title: string;
	date: string;
	labels?: string[];
	featured?: boolean;
	hidden?: boolean;
	overview?: string;
	autoOverview?: string;
}

export interface ProjectType extends PostType {
	techs: string[];
	demo?: string;
	repo?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BlogType extends PostType {}

export type PostDescendantType = ProjectType | BlogType;

export interface SectionType {
	name: string;
	link: string;
	position: number;
	tier?: number;
}

export interface GreatSectionType extends SectionType {
	subsections: SectionType[];
}

export interface PostDetailRequestProps {
	params: {
		id: string;
	};
}
