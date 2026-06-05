// Single source of GRI brand tokens. Consumed by both the React/PDF
// renderer and the DOCX renderer so the two outputs stay in sync.

export const COLORS = {
  griBlue: "1B75BB",
  griBlueDeep: "0E4C8A",
  griBlueDark: "093566",
  griGreen: "8BC53F",
  griGreenDeep: "6FA92E",
  navy: "1C2539",
  ink: "2B3445",
  slate: "5D666F",
  mist: "F7F9FB",
  cloud: "EEF3F8",
  white: "FFFFFF",
} as const;

// Hex with leading '#', for CSS/inline styles.
export const hex = (c: keyof typeof COLORS) => `#${COLORS[c]}`;

export const FONTS = {
  display: "Plus Jakarta Sans",
  body: "Inter",
} as const;
