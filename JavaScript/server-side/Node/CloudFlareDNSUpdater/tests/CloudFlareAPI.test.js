const CloudflareAPI = require('../CloudflareAPI.js');

test('adds 1 + 2 to equal 3', () => {
  expect(CloudflareAPI.getHostPublicIp(1, 2)).toBe(3);
});