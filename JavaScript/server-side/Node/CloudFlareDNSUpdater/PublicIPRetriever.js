const axios = require('axios');

class PublicIPRetriever {
   constructor (publicIpUrl) {
      console.log('Hit PublicIPRetriever constructor');
      this.publicIpUrl = publicIpUrl;
   }

   async getHostPublicIp () {
      try {
         const response = await axios(this.publicIpUrl);
         return response.data;
      } catch (error) {
         console.error(error);
      }
   }
}

module.exports = PublicIPRetriever;
