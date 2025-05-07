module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
