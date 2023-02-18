import clsx from "clsx";
import { useMemo } from "react";
import { ListEntry } from "./Entry";
import { ListEntryType } from "@/src/types";

const list: ListEntryType[] = [
  {
    name: "Shibaura Institute of Technology",
    addon: "April 2022 - July 2022",
    type: "education",
    description: (
      <ul>
        <li>
          Had taken the courses: ICT Systems Design, Recent Trends in
          Information Systems, Japanese Language, Computer Simulation, and
          Calculus with Differential Equations.
        </li>
      </ul>
    ),
    attachments: [],
  },
  {
    name: "Bina Nusantara Computer Club (BNCC) Alam Sutera",
    addon: "October 2019 - October 2021",
    type: "organization",
    description: (
      <ul>
        <li>
          Had been the manager of the Learning and Teaching (LnT) division,
          managing and organizing the members&apos; classes.
        </li>
        <li>
          Had been the C Programming Instructor, teaching first semester
          students basic C programming and algorithms.
        </li>
        <li>Had been a part of the committee of few events.</li>
      </ul>
    ),
    attachments: [
      {
        title: "C Programming Instructor",
        link: "/attachments/c-programming-instructor.png",
        width: 1024,
        height: 768,
      },
      {
        title: "Android for Future, Android Programming Workshop",
        link: "https://student-activity.binus.ac.id/bncc/wp-content/uploads/sites/23/2020/07/Screenshot-14.png",
      },
      {
        title: "Let's Learn C Programming, BNCC x Course-Net Workshop",
        link: "https://student-activity.binus.ac.id/bncc/wp-content/uploads/sites/23/2021/09/Screen-Shot-2021-09-18-at-12.24.25.png",
      },
    ],
  },
  {
    name: "BINUS University",
    addon: "August 2019 - 2023",
    type: "education",
    description: (
      <ul>
        <li>Majoring in Computer Science (Global Class).</li>
        <li>
          Joined student organization Bina Nusantara Computer Club (BNCC) Alam
          Sutera in October 2019.
        </li>
        <li>
          Participated in Indonesia National Contest 2020, and placed 37th as a
          team out of 700+ teams.
        </li>
      </ul>
    ),
    attachments: [
      {
        title: "Indonesia National Contest",
        link: "/attachments/inc-certificate.png",
        width: 1024,
        height: 768,
      },
    ],
  },
  {
    name: "SMA Citra Berkat",
    addon: "2016 - 2019",
    type: "education",
    description: (
      <ul>
        <li>I majored in Natural Sciences.</li>
      </ul>
    ),
    attachments: [],
  },
];

export function List() {
  const renderListEntries = useMemo(
    () =>
      list.map((entry, idx) => (
        <ListEntry
          key={entry.name}
          {...entry}
          idx={idx}
          maxIdx={list.length - 1}
        />
      )),
    []
  );

  return (
    <div className="relative flex flex-col gap-8">
      <div
        className={clsx(
          "List_line",
          "absolute bg-blue-400",
          "w-1 md:self-center",
          "z-30"
        )}
      />
      {renderListEntries}
    </div>
  );
}
