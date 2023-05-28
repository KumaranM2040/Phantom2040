ARG CACHE_DATE=not_a_date
FROM node:18-alpine

RUN mkdir -p /home/node/CloudflareDNSUpdater/ && chown -R node:node /home/node/CloudflareDNSUpdater
# Create app directory
WORKDIR /home/node/CloudflareDNSUpdater
ARG SITEENV
# Install app dependencies
RUN echo $SITEENV
COPY $SITEENV ./.env

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install -g npm@9.6.6
RUN npm install --omit=dev

# Bundle app source
COPY --chown=node:node . .
#CMD sh
CMD ["npm", "run", "prod"]
