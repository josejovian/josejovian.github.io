import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { LinkType, StateType } from "@/src/types";

export interface NavLinksProps {
  links: LinkType[];
  loading: boolean;
  mobileHidden: boolean;
  stateMode: StateType<boolean>;
}

export function NavLinks({
  links,
  loading,
  mobileHidden,
  stateMode,
}: NavLinksProps) {
  const [mode, setMode] = stateMode;

  const router = useRouter();

  const navMainLinksResponsiveStyle = useMemo(
    () => clsx("hidden sm:flex", mobileHidden && "!flex"),
    [mobileHidden]
  );

  return (
    <ul className="flex items-center justify-center border-0 h-full">
      {links
        .filter((x) => !x.hidden)
        .map((link: LinkType, idx: number) => {
          const active = (() => {
            if (
              router.pathname.includes("project") &&
              link.link.includes("project")
            )
              return true;

            if (router.pathname.includes("blog") && link.link.includes("blog"))
              return true;
            return router.pathname === link.link;
          })();

          return (
            <li
              className={clsx(
                "Nav_link",
                "relative flex flex-col items-center h-full",
                active
                  ? [mode ? "bg-slate-600" : "bg-blue-50"]
                  : [mode ? "hover:bg-slate-600" : "hover:bg-gray-100"],
                navMainLinksResponsiveStyle
              )}
              key={`Nav_${link.name}`}
            >
              {active && (
                <span
                  className={clsx(
                    "Nav_arrow",
                    "!absolute",
                    loading ? "-top-2.5" : "-top-0.5",
                    "w-4 h-4",
                    "bg-blue-400 z-50 transition-all duration-600"
                  )}
                ></span>
              )}
              <Link
                href={link.link}
                key={`Nav_${link.name}`}
                className={clsx(
                  "px-8 py-4 z-50",
                  active && (mode ? "text-blue-400" : "text-blue-600"),
                  idx === 0 && mobileHidden
                )}
                aria-label={`Go to page "${link.name}"`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      <li
        className={clsx(
          "Nav_link",
          "relative flex flex-col items-center",
          navMainLinksResponsiveStyle
        )}
      >
        <button
          aria-label="Toggle Dark/Light Mode"
          className={clsx("py-4 z-50 px-4 sm:px-8")}
          onClick={() => setMode((prev) => !prev)}
        >
          {mode ? <BsFillSunFill /> : <BsFillMoonFill />}
        </button>
      </li>
    </ul>
  );
}
