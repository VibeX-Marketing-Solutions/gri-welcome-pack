// Renders a heading where an optional keyword is wrapped in GRI green —
// the brand's headline-accent device.
export function Highlight({
  text,
  word,
  className = "",
  accentClass = "text-gri-green",
}: {
  text: string;
  word?: string;
  className?: string;
  accentClass?: string;
}) {
  if (!word || !text.includes(word)) return <span className={className}>{text}</span>;
  const [before, after] = text.split(word);
  return (
    <span className={className}>
      {before}
      <span className={accentClass}>{word}</span>
      {after}
    </span>
  );
}
