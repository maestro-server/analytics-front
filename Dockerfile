FROM keymetrics/pm2:8-jessie
MAINTAINER maestro@maestroserver.io

# Bundle APP files
WORKDIR /data

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY app/ app/
COPY ./public/ public/
COPY package.json .
COPY pm2.json .
COPY server.js .

RUN mkdir -p /data/artifacts/graphs-bussiness
RUN npm install --only=production


ENTRYPOINT ["/sbin/tini","-g","--"]
CMD ["docker-entrypoint.sh"]