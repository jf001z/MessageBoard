# Message Board

This Message Board using Material-UI, Material-Table in front end and express, graphql, MongoDB in backend, The app is using websocket to live update the latest message.

# Required Apps

In order to run this app locally, following apps have to be installed.

1. [Docker](https://docs.docker.com/)
1. [Docker Compose](https://docs.docker.com/compose/install/)
1. [Nodejs](https://nodejs.org/en/download/)
1. [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
1. [MongoDB Compass](https://www.mongodb.com/try/download/compass)

# Database Setup

First run following command to download the project:

`git clone https://github.com/jf001z/MessageBoard`

Then

`cd MessageBoard`

Then run following command:

`docker ps -a`

To check if any exist docker container using port 27018, if it is occupied please stop that container by

`docker stop you_container_name`.

and run following command to install database container:

`docker-compose up -d`

# Create Test Data

After db is setup, go into server folder `cd server` inside folder `MessageBoard`. Then run

`yarn`

to install depending modules. Then run

`yarn generateTestData`

to create test data. You can check if the test data has been created on Compass:

# Run Api Server

Then inside folder server, run 'yarn dev' to start the api server. The api is using epxress and graphql. You can check the server by visit following url

`http://localhost:4000/graphql`

it will be like this:

![graphql playgound](https://github.com/jf001z/MessageBoard/blob/master/images/graphql.png)

# Run Frontend Server

If the api server is running ok, open another cmd window and going into frontend folder, run

`yarn`

to install modules, then run

`yarn dev`

If the api server is running ok, open another cmd window and going into frontend folder, run `yarn` to install modules, then run `yarn dev`. This will start the frontend server, you can see the page using following url:

`http://localhost:3030`

and the page is like this and it is using websocket to live update the latest message:


![basic_layout](https://github.com/jf001z/MessageBoard/blob/master/images/basic_layout.gif)


![basic_layout](https://github.com/jf001z/MessageBoard/blob/master/images/websocket.gif)

The app worked and tested on Mac system. I didn't test it on windows, because I don't have window pc.

# Things needs to be improved

1. Layout needs to be improved with better design.

1. Have no time to write the Unit test. If have more time, will do it.

1. more functions needs to be added to the message list like sort, pagination.
