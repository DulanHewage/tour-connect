export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  // Ignore the dist directory
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
