import clsx from "clsx";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import { BsZoomIn, BsZoomOut, BsXLg } from "react-icons/bs";
import { ActionButton } from "@/src/components";
import { defaultModal, ModalContext } from "@/src/contexts";

const multiplier: number[] = [1, 1.2, 1.5],
  minScale = 0,
  maxScale = multiplier.length - 1;

export function PictureViewer() {
  const { modal, setModal } = useContext(ModalContext);
  const [scale, setScale] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  const calculateScale = useCallback((dir: number, prevScale: number) => {
    if ((dir > 0 && prevScale < maxScale) || (dir < 0 && prevScale > minScale))
      return prevScale + dir;
    else return prevScale;
  }, []);

  const whenScroll = useCallback(
    (e: WheelEvent) => {
      const dir: number = e.deltaY < 0 ? 1 : -1;
      setScale((prevScale) => {
        return calculateScale(dir, prevScale);
      });
    },
    [calculateScale]
  );

  const zoom = useCallback(
    (dir: number) => {
      setScale((prevScale) => {
        return calculateScale(dir, prevScale);
      });
    },
    [calculateScale]
  );

  const cleanUp = useCallback(() => {
    const innerWrapper: HTMLElement | null = document.getElementById(
        "PictureViewer_image"
      ),
      outerWrapper: HTMLElement | null = document.getElementById(
        "PictureViewer_image"
      );

    if (innerWrapper && outerWrapper) {
      setActive(false);
      setTimeout(() => {
        innerWrapper.removeEventListener("wheel", whenScroll);
        setModal(defaultModal);
        setScale(0);
      }, 200);
    }
  }, [setModal, whenScroll]);

  useEffect(() => {
    const innerWrapper: HTMLElement | null = document.getElementById(
        "PictureViewer_image"
      ),
      outerWrapper: HTMLElement | null = document.getElementById(
        "PictureViewer_image"
      );

    if (innerWrapper && outerWrapper) {
      innerWrapper.removeEventListener("wheel", whenScroll);
      innerWrapper.addEventListener("wheel", whenScroll, {
        passive: true,
      });
      setTimeout(() => {
        setActive(true);
      }, 200);
    }
  }, [modal, whenScroll]);

  if (modal.src === "") {
    return <></>;
  }

  return (
    <div
      id="PictureViewer_wrapper"
      className={clsx(
        "fixed top-0 left-0",
        "w-screen h-screen",
        "flex items-center justify-center",
        "text-white transition-opacity",
        active ? "opacity-100" : "opacity-0"
      )}
      style={{ zIndex: 60 }}
    >
      <div
        className={clsx(
          "fixed top-0 left-0",
          "w-screen h-screen",
          "bg-stone-900"
        )}
        style={{ zIndex: 60 }}
        onClick={() => cleanUp()}
      />
      <div className="max-w-none" style={{ zIndex: 70 }}>
        <div
          className={clsx(
            "fixed top-0 left-0",
            "w-screen h-8 p-8",
            "flex items-center justify-between",
            "bg-stone-900 shadow-lg"
          )}
          style={{ zIndex: 80 }}
        >
          <span>{modal.alt}</span>
          <div className="flex gap-4">
            <ActionButton
              icon={<BsZoomIn />}
              onClick={() => zoom(1)}
              disabled={scale === maxScale}
            />
            <ActionButton
              icon={<BsZoomOut />}
              onClick={() => zoom(-1)}
              disabled={scale === minScale}
            />
            <ActionButton icon={<BsXLg />} onClick={() => cleanUp()} />
          </div>
        </div>
        <motion.div
          drag
          dragConstraints={{
            top: -64,
            left: -64,
            right: 64,
            bottom: 64,
          }}
          id="PictureViewer_image"
          className="relative cursor-move overflow-hidden max-w-none"
        >
          <Image
            className="absolute left-0 top-0 max-w-none"
            src={modal.src}
            placeholder="blur"
            blurDataURL="/placeholder.png"
            width={modal.width * multiplier[scale]}
            height={modal.height * multiplier[scale]}
            alt={modal.alt}
            title={modal.alt}
          />
        </motion.div>
      </div>
    </div>
  );
}
