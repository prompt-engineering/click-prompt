module.exports = {
  "{src/pages,src/components,src/layout}/*.{js,jsx,ts,tsx}": "npm run lint:fix",
  "{src/pages,src/components,src/layout}/**/*.{js,jsx,ts,tsx}": "npm run format:fix",
};
