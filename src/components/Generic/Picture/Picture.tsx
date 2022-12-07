import clsx from "clsx";
import { useContext } from "react";
import Image from "next/image";
import { ModalContext, ModalContextProps } from "@/src/contexts";

export interface PictureProps {
	src: string;
	width: number;
	height: number;
	ogWidth?: number;
	ogHeight?: number;
	alt: string;
}

export function Picture({
	src,
	width,
	height,
	ogWidth,
	ogHeight,
	alt,
}: PictureProps) {
	const { modal, setModal } = useContext<ModalContextProps>(ModalContext);

	return (
		<Image
			src={src}
			width={width}
			height={height}
			alt={alt}
			title={alt}
			className={clsx(
				"hover:opacity-60 active:opacity-20",
				"cursor-pointer transition-opacity"
			)}
			onClick={() => {
				setModal({
					src: src,
					width: ogWidth ?? width,
					height: ogHeight ?? height,
					alt: alt,
				});
			}}
		/>
	);
}
