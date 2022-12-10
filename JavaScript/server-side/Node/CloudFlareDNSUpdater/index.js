#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const CloudflareAPI = require('./CloudflareAPI');
const PublicIPRetriever = require('./PublicIPRetriever');

const argv = yargs(hideBin(process.argv))
   .example(
      '$0 ',
      'Checks current IP address and compares to Cloudflare DNSA entry, If different update'
   )
   .demandOption(['e', 'k', 'z', 'd', 'a', 'f', 'i'])
   .help('h')
   .alias('h', 'help')
   .epilog('copyright 2019')
   .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging',
   })
   .option('frequency', {
      alias: 'f',
      type: 'number',
      description:
         'number of minutes between checking/updating DNSA IP Address in Cloudflare',
   })
   .option('accountId', {
      alias: 'a',
      type: 'string',
      description: 'Cloudflare Account Id',
   })
   .option('zoneId', {
      alias: 'z',
      type: 'string',
      description: 'Cloudflare Zone Id',
   })
   .option('domainName', {
      alias: 'd',
      type: 'string',
      description: 'Cloudflare managed Domain Name',
   })
   .option('email', {
      alias: 'e',
      type: 'string',
      description: 'Email address used in the X-Auth header',
   })
   .option('key', {
      alias: 'k',
      type: 'string',
      description: 'Key used in the X-Auth header',
   })
   .option('publicIpUrl', {
      alias: 'i',
      type: 'string',
      description: 'URL to acquire public IP Address',
   }).argv;

const cloudFlareClient = new CloudflareAPI(argv.email,argv.key, argv.zoneId, argv.accountId, argv.domainName);
const publicIpRetriever = new PublicIPRetriever(argv.publicIpUrl);

let hostPublicIpAddress = undefined;
let dnsAIpAddress = undefined;

async function checkForUpdates() {
   console.log('checkForUpdates');
   let currentPublicIp = await publicIpRetriever.getHostPublicIp();
   if (currentPublicIp === hostPublicIpAddress) {
      console.log('Our Public IP has not changed since the last time we checked. No need to update Cloudflare');
      return;
   } else {
      dnsAIpAddress = await cloudFlareClient.getCloudflareDNSAEntryIp();
   }
   if (currentPublicIp !== dnsAIpAddress) {
      await cloudFlareClient.updateCloudflareDNSA(currentPublicIp);
   } else {
      console.log ('Cloudflare DNSA Ip Address and our current public IP Address are in sync. Nothing to do')
   }
}
checkForUpdates();
setInterval(checkForUpdates, argv.frequency * 60 * 1000);
