# reaktor-rps
reaktor pre assignment

# Reaktor pre-assignment
my solution for the Reaktor pre-assignment 2022 for Summer Developers. This repository has the react frontend and node express backend for the app. 
The app uses mongodb database to store history which is periodically from the history api.

There's also my heroku build at: https://github.com/kurukimi/rps-heroku

And live build at: https://reaktor-rps2022.herokuapp.com/

The heroku app uses mongodb atlas free tier, so queries may be slow.

## Running locally

Set env file DB variable equal to mongodb://mongodb:27017/my_database, or some other mongodb database.
run command: docker-compose up

after setup app runs at `localhost:80`

