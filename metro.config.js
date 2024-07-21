const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    sourceExts: [...sourceExts, 'svg'],
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    // assetExts: [defaultConfig.resolver.assetExts, ...assetExts],
  },
};

module.exports = mergeConfig(defaultConfig, config);
