module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@/api': './src/api',
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/constants': './src/constants',
          '@/utils': './src/utils',
          '@/screens': './src/screens',
          '@/store': './src/store',
          '@/types': './src/types',
        },
      },
    ],
  ],
};
