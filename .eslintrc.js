module.exports = {
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
    'taro/react'
  ],
 
  // in antd-design-pro
  globals: {
    page: true,
  },
 
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": 0,
    "react/react-in-jsx-scope": 0,
    "class-methods-use-this": 0,
    "no-plusplus": 0,
    "import/no-commonjs": 0,
    "no-underscore-dangle": 0
  }
};