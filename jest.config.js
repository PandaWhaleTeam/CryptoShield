

const config = {
    verbose: true,
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    testPathIgnorePatterns: ['/node_modules/', '/__mocks__/', 'App.test.js'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};

module.exports = config;