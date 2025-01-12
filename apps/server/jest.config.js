/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};