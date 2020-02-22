ARG CACHE_DATE=not_a_date
FROM node:10-alpine


RUN mkdir -p /home/node/dev/Phantom2040/Javascript/Node/RasberryPi-IOT/rpiIOT && chown -R node:node /home/node/dev/Phantom2040/Javascript/Node/RasberryPi-IOT/rpiIOT
RUN mkdir -p /etc/letsencrypt/live/silverlanternslight.com && chown -R node:node /etc/letsencrypt/live/silverlanternslight.com
# Create app directory
WORKDIR /home/node/dev/Phantom2040/Javascript/Node/RasberryPi-IOT/rpiIOT
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
#RUN npm install socket.io
RUN apk add make gcc g++ python
RUN npm install --production

#USER node

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY --chown=node:node . .
EXPOSE 8080
EXPOSE 443
#CMD sh
CMD ["npm", "run", "prod"]
