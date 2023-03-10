import Link from "next/link";
import clsx from "clsx";
import NavImage from "./NavImage.svg";

export interface NavLogoProps {
  hidden: boolean;
}

export function NavLogo({ hidden }: NavLogoProps) {
  return (
    <div
      className={clsx("flex items-center justify-center", hidden && "!hidden")}
    >
      <Link href="/" aria-label={`Go back to the homepage`}>
        <div className="NavImage bg-blue-400">
          <svg width="108" height="28">
            <defs>
              <clipPath id="Nav_logo-clip">
                <NavImage id="Nav_logo" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </Link>
    </div>
  );
}
