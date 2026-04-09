// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path ke aplikasi Next.js Anda
  dir: './',
})

const customJestConfig = {
  // File untuk setup global (pastikan file ini ada)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  
  // KOREKSI DI SINI: Gunakan 'moduleNameMapper', bukan 'Mapping'
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)