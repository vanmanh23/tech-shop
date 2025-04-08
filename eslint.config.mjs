import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-var": "off", // Disable var rule entirely (not ideal)
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-unsafe-function-type": "error"
      // OR better:
      // "no-var": ["error", { exceptions: ["prisma"] }], // Allow only 'prisma' var
    },
  }
];

export default eslintConfig;
