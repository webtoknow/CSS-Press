// @ts-expect-error we don't have types for style-it
import StyleImport from "style-it";

// style-it ships as a UMD bundle. Vite 8 (Rolldown) may expose the CommonJS
// namespace object as the default import, so unwrap its nested default export.
const Style =
  (StyleImport as unknown as { default?: typeof StyleImport }).default ??
  StyleImport;

export default Style;
