// jest.setup.js
import '@testing-library/jest-dom'

// Polyfill untuk atob/btoa karena JSDOM tidak menyediakannya secara default
if (typeof global.atob === 'undefined') {
  global.atob = (str) => Buffer.from(str, 'base64').toString('binary');
}

if (typeof global.btoa === 'undefined') {
  global.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
}