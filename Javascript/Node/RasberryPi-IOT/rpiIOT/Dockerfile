FROM node:10

RUN mkdir -p /home/pi/dev/Phantom2040/Javascript/Node/RasberryPi-IOT/rpiIOT && chown -R node:node /home/pi/dev/Phantom2040/Javascript/Node/RasberryPi-IOT/rpiIOT
RUN mkdir -p /etc/letsencrypt/live/silverlanternslight.com && chown -R node:node /etc/letsencrypt/live/silverlanternslight.com
# Create app directory
WORKDIR /home/pi/dev/Phantom2040/Javascript/Node/RasberryPi-IOT/rpiIOT
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

USER node

RUN npm install --production
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY --chown=node:node . .
EXPOSE 8080
EXPOSE 443
CMD sh
#CMD ["npm run" , "prod"]
