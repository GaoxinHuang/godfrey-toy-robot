module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: ".",
    testPathIgnorePatterns: ["/node_modules"],
    verbose: true,
    coveragePathIgnorePatterns:["./test"]
  };