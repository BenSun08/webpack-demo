const glob = require('glob');

process.chdir(__dirname);

test('should generate css and js files', () => {
  const cssFiles = glob.sync('./template/dist/**.**.css');
  const jsFiles = glob.sync('./template/dist/**.**.js');
  expect(cssFiles.length).toBeGreaterThan(0);
  expect(jsFiles.length).toBeGreaterThan(0);
});
