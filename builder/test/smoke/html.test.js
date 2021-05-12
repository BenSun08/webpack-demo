const glob = require('glob');

process.chdir(__dirname);

test('should generate html files', () => {
  const files = glob.sync('./template/dist/**.html');
  expect(files.length).toBeGreaterThan(0);
});
