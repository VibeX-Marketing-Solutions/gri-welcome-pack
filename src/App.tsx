import type { ReactElement } from "react";
import { Cover } from "./components/Cover";
import { LetterPage } from "./components/LetterPage";
import { TOC, type TocEntry } from "./components/TOC";
import { SectionDivider } from "./components/SectionDivider";
import { SectionPage } from "./components/SectionPage";
import { DestinationPage } from "./components/DestinationShowcase";
import { SupportPage, FollowPage } from "./components/Closing";
import { GROUPS, SECTIONS, CLOSING } from "./content";

const DESTS_PER_PAGE = 3;

// Build the document as an ordered list of physical pages, assigning sequential
// page numbers and recording where each numbered section lands (for the TOC).
function buildDocument() {
  const pages: { node: ReactElement; pageNo: number }[] = [];
  const tocEntries: TocEntry[] = [];
  let pageNo = 0;

  const add = (make: (n: number) => ReactElement) => {
    pageNo += 1;
    pages.push({ node: make(pageNo), pageNo });
  };

  // Front matter
  add(() => <Cover key="cover" />);
  add((n) => <LetterPage key="letter" pageNo={n} />);
  const tocPageNo = (pageNo += 1); // reserve TOC slot; rendered last once entries known
  const tocIndex = pages.length;
  pages.push({ node: <></>, pageNo: tocPageNo });

  // Sections (with a photo divider before each group's first section)
  let lastGroup: string | null = null;
  for (const section of SECTIONS) {
    if (section.group && section.group !== lastGroup) {
      lastGroup = section.group;
      const g = GROUPS[section.group];
      add(() => <SectionDivider key={`div-${g.key}`} group={g} />);
    }
    // Places to Visit → a multi-page magazine-style showcase
    if (section.variant === "destinations" && section.destinations) {
      const dests = section.destinations;
      let chunkIdx = 0;
      for (let start = 0; start < dests.length; start += DESTS_PER_PAGE) {
        const chunk = dests.slice(start, start + DESTS_PER_PAGE);
        const first = start === 0;
        const heroBottom = chunkIdx % 2 === 1;
        add((n) => {
          if (first) tocEntries.push({ num: section.num, title: section.title, page: n });
          return (
            <DestinationPage
              key={`dest-${start}`}
              section={section}
              destinations={chunk}
              heroBottom={heroBottom}
              showHeader={first}
              pageNo={n}
            />
          );
        });
        chunkIdx += 1;
      }
      continue;
    }

    add((n) => {
      tocEntries.push({ num: section.num, title: section.title, page: n });
      return <SectionPage key={`s-${section.num}`} section={section} pageNo={n} />;
    });
  }

  // Closing pages
  add((n) => {
    tocEntries.push({ num: CLOSING.supportNum, title: CLOSING.supportTitle, page: n });
    return <SupportPage key="support" pageNo={n} />;
  });
  add((n) => {
    tocEntries.push({ num: CLOSING.followNum, title: CLOSING.followTitle, page: n });
    return <FollowPage key="follow" pageNo={n} />;
  });

  // Fill the reserved TOC page now that we know every section's page number.
  pages[tocIndex] = {
    node: <TOC key="toc" entries={tocEntries} pageNo={tocPageNo} />,
    pageNo: tocPageNo,
  };

  return pages;
}

export function App() {
  const pages = buildDocument();
  return <>{pages.map((p) => p.node)}</>;
}
