import expoConfig from "eslint-config-expo/flat.js";

export default [
  ...expoConfig,
  {
    settings: {
      // eslint-plugin-react 7.37.x calls context.getFilename() when
      // React version detection is enabled. ESLint 10 removed that API.
      // Pin the actual app version to avoid the incompatible detector.
      react: { version: "19.3" }
    }
  },
  { ignores: ["dist/*", "node_modules/*", ".expo/*", "tools/nikl-importer/**"] }
];
