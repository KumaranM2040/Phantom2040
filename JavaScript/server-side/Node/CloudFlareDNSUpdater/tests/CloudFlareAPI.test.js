const CloudflareAPI = require('../components/cloudflare/CloudflareAPI.js');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

console.error = jest.fn();
console.log = jest.fn();

beforeEach(() => {
  console.error.mockClear();
  console.log.mockClear();
});

test('given cloudflare URL with authkey and zoneId to return DNSA entry', async () => {
  // Arrange
  const expectedEmailAddress = 'testemail@test.com';
  const expectedAuthKey = 'SomeAuthKey';
  const expectedZoneId = 'SomeZoneId';
  const expectedAccountId = 'SomeAccountId';
  const expectedDomainName = 'SomeDomainName';
  const expectedContentType = 'application/json';
  const expectedUrl = 'https://api.cloudflare.com/client/v4/zones/'+expectedZoneId+'/dns_records?type=A&name='+expectedDomainName+'&status=active&account.id='+expectedAccountId+'&page=1&per_page=20&order=type&direction=desc&match=all';
  let cloudflareAPI = new CloudflareAPI(expectedEmailAddress, expectedAuthKey, expectedZoneId, expectedAccountId, expectedDomainName);
  let mock = new MockAdapter(axios);
  let result = [];
  let payload = {};
  payload.content = '192.168.0.1';
  payload.id = 'SomeUniqueIdentifier';
  result.push(payload);
  const data = { response: true, result };

  mock.onGet(expectedUrl).reply((config) => {
    expect(config.headers["X-Auth-Email"]).toEqual(expectedEmailAddress);
    expect(config.headers["X-Auth-Key"]).toEqual(expectedAuthKey);
    expect(config.headers["Content-Type"]).toEqual(expectedContentType);
    return [200, data];
  });

  // Act
  let dnsAEntryIp = await cloudflareAPI.getCloudflareDNSAEntryIp();

  // Assert
  expect(dnsAEntryIp).toBe(payload.content);
});

test('given invalid cloudflare URL with authkey and zoneId to return DNSA entry', async () => {
  // Arrange
  const expectedEmailAddress = 'testemail@test.com';
  const expectedAuthKey = 'SomeAuthKey';
  const expectedZoneId = 'SomeZoneId';
  const expectedAccountId = 'SomeAccountId';
  const expectedDomainName = 'SomeDomainName';
  const expectedContentType = 'application/json';
  const expectedUrl = 'https://api.cloudflare.com/client/v4/zones/'+expectedZoneId+'/dns_records?type=A&name='+expectedDomainName+'&status=active&account.id='+expectedAccountId+'&page=1&per_page=20&order=type&direction=desc&match=all';
  let cloudflareAPI = new CloudflareAPI(expectedEmailAddress, expectedAuthKey, expectedZoneId, expectedAccountId, expectedContentType);
  let mock = new MockAdapter(axios);

  mock.onGet(expectedUrl).reply((config) => {
    expect(config.headers["X-Auth-Email"]).toEqual(expectedEmailAddress);
    expect(config.headers["X-Auth-Key"]).toEqual(expectedAuthKey);
    expect(config.headers["Content-Type"]).toEqual(expectedContentType);
    return [500, null];
  });

  // Act
  await cloudflareAPI.getCloudflareDNSAEntryIp();

  // Assert
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('given IP Address update without dnsid should not make any callouts', async () => {
  // Arrange
  const expectedEmailAddress = 'testemail@test.com';
  const expectedAuthKey = 'SomeAuthKey';
  const expectedZoneId = 'SomeZoneId';
  const expectedContentType = 'application/json';
  const ipAddress = '44.5.53.1';
  let cloudflareAPI = new CloudflareAPI(expectedEmailAddress, expectedAuthKey, expectedZoneId, '', '');
  let mock = new MockAdapter(axios);

  mock.onAny("/").reply((config) => {
    return [404, null];
  });

  // Act
  await cloudflareAPI.updateCloudflareDNSA(ipAddress);

  // Assert
  expect(console.log).toHaveBeenCalledWith('Cannot update Cloudflare DNSA entry without first calling getCloudflareDNSAEntryIp');
});

test('given IP Address update with dnsid should make PATCH DNSA callout', async () => {
  // Arrange
  const expectedEmailAddress = 'testemail@test.com';
  const expectedAuthKey = 'SomeAuthKey';
  const expectedZoneId = 'SomeZoneId';
  const expectedAccountId = 'SomeAccountId';
  const expectedDomainName = 'SomeDomainName';
  const expectedContentType = 'application/json';
  let payload = {};
  payload.content = '192.168.0.1';
  payload.id = 'SomeUniqueIdentifier';
  const expectedUrl = 'https://api.cloudflare.com/client/v4/zones/'+expectedZoneId+'/dns_records/'+payload.id;
  let cloudflareAPI = new CloudflareAPI(expectedEmailAddress, expectedAuthKey, expectedZoneId, expectedAccountId, expectedDomainName);
  let mock = new MockAdapter(axios);
  let result = [];
  result.push(payload);
  const data = { response: true, result };
  let ipAddress = '44.55.66.77';

  mock.onGet('https://api.cloudflare.com/client/v4/zones/'+expectedZoneId+'/dns_records?type=A&name='+expectedDomainName+'&status=active&account.id='+expectedAccountId+'&page=1&per_page=20&order=type&direction=desc&match=all').reply((config) => {
    expect(config.headers["X-Auth-Email"]).toEqual(expectedEmailAddress);
    expect(config.headers["X-Auth-Key"]).toEqual(expectedAuthKey);
    expect(config.headers["Content-Type"]).toEqual(expectedContentType);
    return [200, data];
  }).onPatch(expectedUrl).reply((config) => {
    expect(config.headers["X-Auth-Email"]).toEqual(expectedEmailAddress);
    expect(config.headers["X-Auth-Key"]).toEqual(expectedAuthKey);
    expect(config.headers["Content-Type"]).toEqual(expectedContentType);
    expect(config.data).toEqual('{"type":"A","name":"'+expectedDomainName+'","content":"'+ipAddress+'","ttl":1,"proxied":false}');

  });
  let dnsAEntryIp = await cloudflareAPI.getCloudflareDNSAEntryIp();

  // Act and Assert
  await cloudflareAPI.updateCloudflareDNSA(ipAddress);
});
