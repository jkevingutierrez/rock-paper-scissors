# Game of Drones

This is a version of Rock Paper Scissors using angular 5, node, express and mongo

## Execute

After install npm packages, run `npm run prod` to execute the app. Navigate to `http://localhost:9000/`.

Is necessary to have installed [https://www.mongodb.com](mongodb) and it should be running in port 27017 without users. You can configure the env variable `PROD_MONGODB` or `MONGODB_URI` to use your current mongodb configuration. The variable should follow the next structure: `PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1,host2:port2/dbname`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Example page in Heroku

[https://u-rock-paper-scissors.herokuapp.com/#/](https://u-rock-paper-scissors.herokuapp.com/#/)
