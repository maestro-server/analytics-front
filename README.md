[![Code Climate](https://codeclimate.com/github/maestro-server/analytics-front/badges/gpa.svg)](https://codeclimate.com/github/maestro-server/analytics-front) [![Build Status](https://travis-ci.org/maestro-server/analytics-front.svg?branch=master)](https://travis-ci.org/maestro-server/analytics-front) [![Issue Count](https://codeclimate.com/github/maestro-server/analytics-front/badges/issue_count.svg)](https://codeclimate.com/github/maestro-server/analytics-front)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/12101716a7a64a07a38c8dd0ea645606)](https://www.codacy.com/app/maestro/analytics-front?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maestro-server/analytics-front&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/maestro-server/analytics-front/badge.svg?branch=master)](https://coveralls.io/github/maestro-server/analytics-front?branch=master)

# Maestro Server #

Maestro Server is an open source software platform for management and discovery servers, apps and system for Hybrid IT. Can manage small and large environments, be able to visualize the latest multi-cloud environment state.

### Demo ###
To test out the demo, [Demo Online](http://demo.maestroserver.io "Demo Online")

## Documentation ##
* [UserGuide](http://docs.maestroserver.io/en/latest/userguide/cloud_inventory/inventory.html "User Guide")
* [API Contract](https://maestro-server.github.io/analytics-front/docs/inventory/index.html "API Contract")

# Maestro Server - Analytics Front #

Analytics Front App is front end of analytics graph of Maestro Server, yours responsibility is:

 - Authentication
 - Show graphs SVGs
 - Upload internal SVGs of analytics

We using DDD to organize the code, has infra, repositories, entities (values objects), interfaces, application, and domain.

![arch](http://docs.maestroserver.io/en/latest/_images/fluxo_data.png)

Constructed with KrakenJs, we create a lot of middleware and organize by domain.

**Core API, organized by modules:**

* Core
* Authetication
* Graph

## TechStack ##

* NodeJs 8.11.2
* MongoDB 3.4
* AWS S3 (If using S3 upload)

## Service relations ##
* Maestro Analytics
* Maestro Server App

## Setup ##

#### Installation by docker ####

```bash
docker run -p 9999:9999  -e "MAESTRO_MONGO_URI=mongodb/maestro-client" maestroserver/analytics-front-maestro
```
Or by docker-compose

```bash
version: '2'

services:
    server:
    image: maestroserver/analytics-front-maestro
    ports:
    - "9999:9999"
    environment:
    - "MAESTRO_MONGO_URI=mongodb/maestro-client"
```

#### Dev Env ####

Setup mongodb and fake smtp

```bash
cd devtools/

docker-compose up -d
```

Configure database and port application in .env file

```bash
MAESTRO_PORT=9999
MAESTRO_MONGO_URI='localhost/maestro-client'
```

Development

Install nodejs, version above 7.6, mongodb need to be running.

```bash
npm install
npm run migrate //populate mongodb
npm run server
```

Run all tests or any test type

```bash
mocha test/**/*js --reporter spec

gulp test_e2e
gulp test_unit
gulp eslint
```


### Env variables ###

| Env Variables                | Example                  | Description                   |
|------------------------------|--------------------------|-------------------------------|
| MAESTRO_PORT                 | 9999                     |                               |
| NODE_ENV                     | development|production   |                               |
| MAESTRO_MONGO_URI            | localhost/maestro-client |  DB string connection         |
| MAESTRO_SECRETJWT            | XXXX                     |  Secret key - session         |
| MAESTRO_ANALYTICS_SECRETJWT  | XXXX                     |  Same analytics app           |
| AWS_ACCESS_KEY_ID            | XXXX                     |                               |
| AWS_SECRET_ACCESS_KEY        | XXXX                     |                               |
| AWS_DEFAULT_REGION           | us-east-1                |                               |
| AWS_S3_BUCKET_NAME           | maestroserver            |                               |
| MAESTRO_UPLOAD_TYPE          | S3/Local                 |  Upload mode                  |
| LOCAL_DIR                    | /public/static/          |  Where files will be uploaded |
| PWD                          | $rootDirectory           |  PWD process                  |

### Contribute ###

Are you interested in developing Maestro Server, creating new features or extending them?

We created a set of documentation, explaining how to set up your development environment, coding styles, standards, learn about the architecture and more. Welcome to the team and contribute with us.

[See our developer guide](http://docs.maestroserver.io/en/latest/contrib.html)
