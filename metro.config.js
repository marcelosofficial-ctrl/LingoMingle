import { getDefaultConfig } from "expo/metro-config";

const config = getDefaultConfig(process.cwd());
config.resolver.assetExts = [...new Set([...config.resolver.assetExts, "db"])];

export default config;
