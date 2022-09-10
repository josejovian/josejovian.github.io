import { ModalContext, ModalContextProps } from "@/src/contexts/ModalContext";
import clsx from "clsx";
import Image from "next/image";
import { useContext } from "react";

export interface PictureProps {
	src: string;
	width: number;
	height: number;
	ogWidth?: number;
	ogHeight?: number;
	alt: string;
}

export default function Picture({
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
