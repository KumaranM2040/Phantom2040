const axios = require("axios");

class CloudFlareAPI {

    constructor(email, key, zoneId, accountId, domainName) {
        console.log('Hit constructor');
        this.CloudFlareDNSAIpAddress = '';
        this.email = email;
        this.key = key;
        this.zoneId = zoneId;
        this.domainName = domainName;
        this.accountId = accountId;
    }

    async getHostPublicIp() {
        try
        {
            const response = await axios("https://api.ipify.org");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateCloudflareDNSAIpIfDifferent(currentPublicIP) {
        console.log("Our current Public IP is " + currentPublicIP);
        try {
            if (currentPublicIP === this.CloudFlareDNSAIpAddress) {
                console.log("Our IP has not changed since the last time we checked. No need to query Cloudflare");
                return;
            }
            const headers = {
                "X-Auth-Email": this.email,
                "X-Auth-Key": this.key,
                "content-type": "application/json"
            };
            const getCloudFlareDNSAOptions = {
                url: 'https://api.cloudflare.com/client/v4/zones/'+this.zoneId+'/dns_records?type=A&name='+this.domainName+'&status=active&account.id='+this.accountId+'&page=1&per_page=20&order=type&direction=desc&match=all',
                json: "true",
                headers
            };

            const response = await axios(getCloudFlareDNSAOptions);
            const result = response.data;
            let dnsARecord = result.result[0].content;
            const dnsId = result.result[0].id;
            console.log('CloudFlare DNSA record Ip Address for '+ this.domainName +' is ' + dnsARecord);
            this.CloudFlareDNSAIpAddress = dnsARecord
            if (dnsARecord !== currentPublicIP && currentPublicIP.length > 0) {
                console.log("Change in Public IP address detected: Current Public IP is " + currentPublicIP + " dnsARecord is " + dnsARecord);
                const url = 'https://api.cloudflare.com/client/v4/zones/'+ this.zoneId+ '/dns_records/'+ dnsId;
                const patchCloudFlareDNSA = {
                    method: 'PATCH',
                    url,
                    headers,
                    data: JSON.stringify({
                        type: "A",
                        name: this.domainName,
                        content: currentPublicIP,
                        ttl: 1,
                        proxied: false
                    })
                };
                const res = await axios(patchCloudFlareDNSA);
                console.log("Successfully update Cloudflare DNS A record for Domain silverlanternslight");
                this.CloudFlareDNSAIpAddres = currentPublicIP;
            } else if (currentPublicIP.length > 0) {
                console.log("No change in Public IP address " + currentPublicIP);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}

module.exports = CloudFlareAPI;