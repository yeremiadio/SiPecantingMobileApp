module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-native/no-inline-styles': 0,
    'react/no-unstable-nested-components': 0,
    'react-hooks/exhaustive-deps': 0, // <--- THIS IS THE NEW RULE
  },
};
