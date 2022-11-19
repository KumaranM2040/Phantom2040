#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const CloudFlareAPI = require('./CloudFlareAPI');
const argv = yargs(hideBin(process.argv))
  .example('$0 ', 'Checks current IP address and compares to CloudFlare DNSA entry, If different update')
  .demandOption(['e','k','z','d','a','f'])
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2019')
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .option('frequency', {
    alias: 'f',
    type: 'number',
    description: 'number of minutes between checking/updating DNSA IP Address in CloudFlare'
  })
  .option('accountId', {
    alias: 'a',
    type: 'string',
    description: 'Cloudflare Account Id'
  })
  .option('zoneId', {
    alias: 'z',
    type: 'string',
    description: 'Cloudflare Zone Id'
  })
  .option('domainName', {
    alias: 'd',
    type: 'string',
    description: 'Cloudflare managed Domain Name'
  })
  .option('email', {
    alias: 'e',
    type: 'string',
    description: 'Email address used in the X-Auth header'
  })
  .option('key', {
    alias: 'k',
    type: 'string',
    description: 'Key used in the X-Auth header'
  })
  .argv

const client = new CloudFlareAPI(argv.email, argv.key, argv.zoneId, argv.accountId, argv.domainName);

async function checkForUpdates(){
  console.log('checkForUpdates');
  let currentPublicIp = await client.getHostPublicIp();
  await client.updateCloudflareDNSAIpIfDifferent(currentPublicIp);
}
checkForUpdates();
setInterval(checkForUpdates, argv.frequency * 60 * 1000);
