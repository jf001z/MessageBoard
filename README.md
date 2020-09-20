# ToDoList

This ToDoList using Material-UI, Material-Table in front end and graphql, MongoDB in backend

# Required Apps

In order to run this app locally, following apps have to be installed.

1. [Docker](https://docs.docker.com/)
1. [Docker Compose](https://docs.docker.com/compose/install/)
1. [Nodejs](https://nodejs.org/en/download/)
1. [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
1. [MongoDB Compass](https://www.mongodb.com/try/download/compass)

# Database Setup

First run following command to download the project:

`git clone https://github.com/jf001z/ToDoList.git`

Then run following command:

`docker ps -a`

To check if any exist docker container using port 27018, if it is ocupied please stop that container by

`docker stop you_container_name`.

Then go into nectar folder by

`cd ToDoList`

and run following command to install database container:

To check if any exist docker container using port 27018, if it is ocupied please stop that container by `docker stop you_container_name`.

Then go into nectar folder by `cd ToDoList` and run following command to install database container:

`docker-compose up -d`

This app is using MongoDB as the database, by running above command a MongoDB container will be created automatically. The container is like this:

![MongoDB container](https://github.com/jf001z/ToDoList/blob/master/images/docker.png)

To check if the database installed successfully, you can use MongoDB Compass to connect to the db to check if a new db `todo-list` is created. The connection string for MongoDB Compass is 'mongodb://todolist:todolist@localhost:27018/todolist?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false'. The user name and password can be found in file docker-compose.yml.

# Create Test Data

After db is setup, go into server folder `cd server` inside folder `ToDoList`. Then run

`yarn`

to install depending modules. Then run

`yarn generateTestData`

to create test data. You can check if the test data has been created on Compass, should be like this:

After db is setup, go into server folder `cd server` inside folder `ToDoList`. Then run 'yarn generateTestData' to create test data. You can check if the test data has been created on Compass, should be like this:

![MongoDB Compass](https://github.com/jf001z/ToDoList/blob/master/images/MongoDB_Compass.png)

# Run Api Server

Then run 'yarn dev' to start the api server. The api is using epxress and graphql. You can check the server by visit following url

Then inside server folder, run `yarn` to install depending modules. Then run 'yarn dev' to start the api server. The api is using epxress and graphql. You can check the server by visit following url


`http://localhost:4000/graphql`

it will be like this:

![graphql playgound](https://github.com/jf001z/ToDoList/blob/master/images/graphql.png)

You can try some query and mutations, it will be like this:

![graphql playgound gif](https://github.com/jf001z/ToDoList/blob/master/images/backend.gif)

# Run Frontend Server

If the api server is running ok, open another cmd window and going into frontend folder, run

`yarn`

to install modules, then run

`yarn dev`

This will start the frontend server, you can see the page using following url:

If the api server is running ok, open another cmd window and going into frontend folder, run `yarn` to install modules, then run `yarn dev`. This will start the frontend server, you can see the page using following url:


`http://localhost:3030`

and the page is like this:

![dashboard page](https://github.com/jf001z/ToDoList/blob/master/images/screen01.png)

![web animation](https://github.com/jf001z/ToDoList/blob/master/images/frontend.gif)

The app worked and tested on Mac system. I didn't test it on windows, because I don't have window pc.

# Things needs to be improved

1. This app is using material table, but from the performance in this app, I'm not quite satisfied with it. So next step is to change it by react table.

1. Currently in front end only fetch data are working, I don't have time to do the push data part like add, update, delete. These will be done in the next step.

1. Apollo Graphql is used in the app and it provides subscription function which uses websocket protocol to do server to client broadcast, this tech will be used in the next step to do data live update on client side.
