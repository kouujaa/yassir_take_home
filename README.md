# yassir_take_home

yassir-take-hoome

## Description

This project is a take home test for Yassir
The goal of this project is to create a REST API responsible for exposing “the air quality information” of a nearest city to GPS coordinates using iqair

## Technologies

- NodeJS
- Express
- MongoDB
- Jest

## Requirements

- NodeJS
- Yarn

## Installation

run `yarn install` to install all dependencies

## Run

run `yarn start` to start the project
note: the project will run on desired port in env file or 5000 by default

## Test

run `yarn test` to run the tests
The tests are written using Jest

## Documentation

## File and folder structure

- `src`: contains the source code
- `src/models`: contains the database models
- `src/controllers`: contains the controllers
- `src/routes`: contains the api routes
- `src/services`: contains the services
- `src/helpers`: contains the helpers
- `src/jobs`: contains the cron jobs

## Endpoints

### BASE_URL

http://localhost:5000/iqAir

### GET /air-quality

make a call to IQAIR API to get “air quality“ for the given zone

#### Query parameters

- `latitude`: latitude of the location
- `longitude`: longitude of the location

##### GET /most-polluted-zone

Get Datetime( date and time ) where the paris zone is the most polluted ( based on your CRON JOB results).

## Naming conventions

variables are named using snake_case
functions are named using camelCase
files are named using camelCase

## Database

The database used is MongoDB
the database is hosted on MongoDB Atlas

## Environment variables

- `PORT`: the port on which the server will run
- `DB_URL`: the uri of the mongodb database
- `IQAIR_API_KEY`: the api key of the iqair api
- `CRON_JOB_SCHEDULE`: the cron job schedule

## Cron job

The cron job is scheduled to run every 1 minutes

## Notes

for testing purposes, the .env file is included in the project
