
// jest.config.js
const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const createJestConfig = nextJest({  
  dir: "./",
});

const customJestConfig = {
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testEnvironment: "node",
};

module.exports = createJestConfig(customJestConfig);