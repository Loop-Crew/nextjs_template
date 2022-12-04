function makeModuleNameMapper(tsconfigPath) {
  // Get paths from tsconfig
  const { paths, baseUrl } = require(tsconfigPath).compilerOptions;

  const aliases = {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
  };

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '/(.*)');
    const path = paths[item][0].replace('/*', '/$1');
    aliases[key] = '<rootDir>/' + baseUrl + '/' + path;
  });
  return aliases;
}

const TS_CONFIG_PATH = './tsconfig.json';

module.exports = {
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: makeModuleNameMapper(TS_CONFIG_PATH),
  testEnvironment: 'jest-environment-jsdom',
  watchPathIgnorePatterns: ['node_modules'],
};

process.env = Object.assign(process.env, {
  NEXT_PUBLIC_URL: 'http://localhost:3000',
  NEXT_PUBLIC_API_URL: 'http://localhost:8080/graphql',
});
