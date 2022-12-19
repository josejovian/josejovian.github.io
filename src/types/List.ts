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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	description: JSX.Element;
	type?: ListEntryCategoryType;
	attachments?: ListEntryAttachmentType[];
}
