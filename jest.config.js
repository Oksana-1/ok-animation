module.exports = {
  verbose: true,
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "jsdom",
  collectCoverage: false,
  collectCoverageFrom: ["**/*.js", "!**/node_modules/**"],
};