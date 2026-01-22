const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // テストで使用する next.config.js と .env ファイルの場所
  dir: './',
});

// Jest に渡すカスタム設定
const customJestConfig = {
  // 個々のテスト実行前に処理されるファイル
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
    // CSS modules -> identity-obj-proxy
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // Path alias mappings — components live at <rootDir>/components
    "^components/(.*)$": "<rootDir>/components/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/(.*)$": "<rootDir>/$1",
    "^styles/(.*)$": "<rootDir>/src/styles/$1",
    "^images/(.*)$": "<rootDir>/public/$1"
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
