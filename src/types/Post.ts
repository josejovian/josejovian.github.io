export type ContentType = "blogs" | "projects";

export interface PostType {
	id: string;
	title: string;
	date: string;
	featured?: boolean;
	hidden?: boolean;
	overview?: string;
	autoOverview?: string;
}

export interface SectionType {
	name: string;
	link: string;
	position?: number;
	tier?: number;
}

export interface GreatSectionType extends SectionType {
	subsections: SectionType[];
}

export interface ProjectType extends PostType {
	techs: string[];
	demo?: string;
	repo?: string;
}

export interface BlogType extends PostType {}

export type PostDescendantType = ProjectType | BlogType;
