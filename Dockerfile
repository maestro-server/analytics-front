FROM keymetrics/pm2:8-alpine
MAINTAINER maestro@maestroserver.io

# Bundle APP files
WORKDIR /data

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY app/ app/
COPY public/templates public/templates
COPY package.json .
COPY pm2.json .
COPY server.js .

RUN mkdir -p /data/public/static

RUN apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make python tini
RUN npm install --only=production
RUN npm rebuild bcrypt --build-from-source

ENTRYPOINT ["/sbin/tini","-g","--"]
CMD ["docker-entrypoint.sh"]

#sudo apt-get install libfontconfig