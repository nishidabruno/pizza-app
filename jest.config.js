module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: [
    '/node_modules',
    '/ios',
    '/android',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect'
  ],
}
