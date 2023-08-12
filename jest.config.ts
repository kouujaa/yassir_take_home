module.exports = {
    preset: 'ts-jest',
    collectCoverageFrom: [
        'src/**/*.{ts}',
        // '!src/**/*.d.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.ts'],

}