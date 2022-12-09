export type ListEntryCategoryType = "education" | "work" | "organization";

export interface ListEntryAttachmentType {
	title: string;
	link: string;
	width?: number;
	height?: number;
}

export interface ListEntryType {
	name: string;
	addon: string;
	description: any;
	type?: ListEntryCategoryType;
	attachments?: ListEntryAttachmentType[];
}
