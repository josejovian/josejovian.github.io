import clsx from "clsx";
import { useContext } from "react";
import Image from "next/legacy/image";
import { ModalContext } from "@/src/contexts";

export interface PictureProps {
	src: string;
	width: number;
	height: number;
	ogWidth?: number;
	ogHeight?: number;
	alt: string;
	zoomable?: boolean;
}

export function Picture({
	src,
	width,
	height,
	ogWidth,
	ogHeight,
	alt,
	zoomable = true,
}: PictureProps) {
	const { setModal } = useContext(ModalContext);

	return (
		<Image
			src={src}
			width={width}
			height={height}
			alt={alt}
			title={alt}
			className={clsx(
				zoomable && "hover:opacity-60 active:opacity-20 cursor-pointer",
				"transition-opacity"
			)}
			onClick={() => {
				zoomable &&
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
