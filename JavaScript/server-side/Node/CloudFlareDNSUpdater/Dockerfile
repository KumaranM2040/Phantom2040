ARG CACHE_DATE=not_a_date
FROM node:10-alpine

RUN mkdir -p /home/node/dev/Phantom2040/Javascript/Node/CloudflareDNSUpdater/ && chown -R node:node /home/node/dev/Phantom2040/Javascript/Node/CloudflareDNSUpdater
# Create app directory
WORKDIR /home/node/dev/Phantom2040/Javascript/Node/CloudflareDNSUpdater
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY --chown=node:node . .
#CMD sh
CMD ["npm", "run", "prod"]
