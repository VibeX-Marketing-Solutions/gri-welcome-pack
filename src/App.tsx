import { Cover } from "./components/Cover";
import { LetterPage } from "./components/LetterPage";
import { SectionDivider } from "./components/SectionDivider";
import { SectionPage } from "./components/SectionPage";
import { GROUPS, SECTIONS } from "./content";

// ── SAMPLE PHASE ──────────────────────────────────────────────────────────
// Three representative templates for review: Cover, Directors' Letter, a
// photo Section Divider, and the Accommodation content section. The full
// 27-section rollout follows once the design is approved.
export function App() {
  const accommodation = SECTIONS.find((s) => s.num === 5)!;
  return (
    <>
      <Cover />
      <LetterPage pageNo={2} />
      <SectionDivider group={GROUPS.settling} />
      <SectionPage section={accommodation} pageNo={4} />
    </>
  );
}
