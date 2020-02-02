const request = require("request-promise-native");

var lastPublicIpAddress = "";
var lastDnsARecord = "";

function updateCloudFlareDNSARecordIfRequired() {
  var prom = new Promise(function(resolve, reject) {
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        const content = body.result[0].content;
        console.log(content);
      }
    }

    function onError(error) {
      console.log("failed due to error" + error);
      reject();
    }

    function onSuccess(currentPublicIP) {
      console.log("Our current Public IP is " + currentPublicIP);
      if (currentPublicIP === lastPublicIpAddress) {
        console.log(
          "Our IP has not changed since the last time we checked. No need to query Cloudflare"
        );
        resolve();
        return;
      }

      const options = {
        url:
          "https://api.cloudflare.com/client/v4/zones/9ec329dd044850e58adaf4b438a55530/dns_records?type=A&name=silverlanternslight.com&status=active&account.id=77a3d8b49911c385263fb6627104a40b&page=1&per_page=20&order=status&direction=desc&match=all",
        json: "true",
        headers: {
          "X-Auth-Email": "kumaranm2040@gmail.com",
          "X-Auth-Key": "e6a6ea969e14bcf8832ea36fd2d74730bf267"
        }
      };
      if (lastDnsARecord.length > 0 && lastDnsARecord === currentPublicIP) {
        console.log(
          "Current Ip address has changed but it already match lastDnsARecord so dont query and update Cloudflare"
        );
        resolve();
        return;
      }

      request(options).then(
        result => {
          let dnsARecord = result.result[0].content;
          const dnsId = result.result[0].id;
          console.log(dnsARecord);
          lastPublicIpAddress = currentPublicIP;
          lastDnsARecord = dnsARecord;
          if (dnsARecord !== currentPublicIP && currentPublicIP.length > 0) {
            console.log(
              "Change in Public IP address detected: Current Public IP is " +
                currentPublicIP +
                " dnsARecord is " +
                dnsARecord
            );
            request
              .patch({
                url:
                  "https://api.cloudflare.com/client/v4/zones/9ec329dd044850e58adaf4b438a55530/dns_records/" +
                  dnsId,
                headers: {
                  "X-Auth-Email": "kumaranm2040@gmail.com",
                  "X-Auth-Key": "e6a6ea969e14bcf8832ea36fd2d74730bf267",
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  type: "A",
                  name: "silverlanternslight.com",
                  content: currentPublicIP,
                  ttl: 1,
                  proxied: false
                })
              })
              .then(
                response => {
                  console.log(
                    "Successfully update Cloudflare DNS A record for Domain silverlanternslight" +
                      response
                  );
                  resolve();
                },
                error => {
                  console.log(
                    "Patch to Cloudflare failed due to error" + error
                  );
                  reject();
                }
              );
          } else if (currentPublicIP.length > 0) {
            console.log("No change in Public IP address " + currentPublicIP);
            resolve();
          }
        },
        error => {
          console.log("DNS check on CloudFlare failed with error" + error);
          reject();
        }
      );
    }
    request("https://api.ipify.org").then(onSuccess, onError);
  });
  return prom;
}

module.exports = updateCloudFlareDNSARecordIfRequired;
