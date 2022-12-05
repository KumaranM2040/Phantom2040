const CloudFlareAPI = require('../CloudFlareAPI.js');

test('adds 1 + 2 to equal 3', () => {
  expect(CloudFlareAPI.getHostPublicIp(1, 2)).toBe(3);
});