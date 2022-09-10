export interface ProjectProps {
	id: string,
	title: string,
	techs: string[],
	featured?: boolean,
	hidden?: boolean,
	overview: string,
}