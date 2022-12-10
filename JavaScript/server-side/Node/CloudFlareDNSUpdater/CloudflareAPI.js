const axios = require('axios');

class CloudflareAPI {
   constructor (email, key, zoneId, accountId, domainName) {
      console.log('Hit CloudflareAPI constructor');
      this.CloudflareDNSAIpAddress = null;
      this.dnsId = null;
      this.email = email;
      this.key = key;
      this.zoneId = zoneId;
      this.domainName = domainName;
      this.accountId = accountId;
      this.CloudflareAPIUrl = 'https://api.cloudflare.com/client/v4/zones/';
   }

   buildCloudflareRequest(httpVerb, url, payload) {
      const headers = {
         'X-Auth-Email': this.email,
         'X-Auth-Key': this.key,
         'content-type': 'application/json'
      };
      let payloadExists = payload ? true : false;
      const request = {
         url,
         json: 'true',
         method: httpVerb,
         headers,
         ...(payloadExists && { data: payload })
      };
      return request;
   }

   async getCloudflareDNSAEntryIp () {
      try {
         const url =  this.CloudflareAPIUrl + this.zoneId + '/dns_records?type=A&name=' + this.domainName + '&status=active&account.id='
         + this.accountId + '&page=1&per_page=20&order=type&direction=desc&match=all';
         const response = await axios(this.buildCloudflareRequest('GET', url, null));
         const result = response.data;
         let dnsARecord = result.result[0].content;
         this.dnsId = result.result[0].id;
         console.log('Cloudflare DNSA record Ip Address for ' + this.domainName + ' is ' + dnsARecord + ' dnsId is ' + this.dnsId);
         this.CloudflareDNSAIpAddress = dnsARecord;
         return dnsARecord;
      } catch (exception) {
         console.error('getCloudflareDNSAEntryIp Exception:' + exception);
      }
   }

   async updateCloudflareDNSA (ipAddress) {
      console.log('IP address to update Cloudflare DNSA entry with ' + ipAddress);
      if (!this.dnsId){
         console.log('Cannot update Cloudflare DNSA entry without first calling getCloudflareDNSAEntryIp');
      }

      try {
         if (this.CloudflareDNSAIpAddress !== ipAddress && ipAddress.length > 0) {
            console.log(
               'Change in IP address detected: Current IP is ' +
                  ipAddress +
                  ' dnsARecord is ' +
                  this.CloudflareDNSAIpAddress
            );
            const url = this.CloudflareAPIUrl + this.zoneId + '/dns_records/' + this.dnsId;
            let payload = JSON.stringify({
               type: 'A',
               name: this.domainName,
               content: ipAddress,
               ttl: 1,
               proxied: false
            })
            const res = await axios(this.buildCloudflareRequest('PATCH', url, payload));
            console.log('Successfully update Cloudflare DNS A record for Domain silverlanternslight');
            this.CloudflareDNSAIpAddres = ipAddress;
         } else if (ipAddress.length > 0) {
            console.log('No change in Public IP address ' + ipAddress);
         }
      } catch (exception) {
         console.error('updateCloudflareDNSA Exception:' + exception);
      }
   }
}

module.exports = CloudflareAPI;
