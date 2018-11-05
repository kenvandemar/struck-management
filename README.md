## TRUCK MANAGEMENT PORTAL 

# Technology use
- Using MERN stack: Mongo, Express, ReactJS and NodeJS
- Using Redux-immutable to manage state
- Using GIT to manage source code
- Except manage state, everything is written in pure JS

# Run Development
## Import DB
 - mongoimport --db foo --collection truck-portal < truckDB.json
 - yarn install or npm install
 - yarn run:server to start server
 - yarn run:client to start client
 - yarn run watch-css to compile SCSS to CSS and watch CSS change
 - Login just for decoration and design purpose, just click Login button to navigate to the home page

# Run production on local
- yarn run:server to start server
- yarn global add serve
- serve -s build

# Have done:
- Create, Read, Update and Delete trucks
- Able to delete item from search page
- Search full text
- Sort trucks bases on Cargo type and price
- Build Mock API server

# Have not done:
- Write Unit test (I prefer TDD due to its efficient and reduce bug amount)
- Complex Search:
    + Currently, user can not perfom comlex search like: type text on search input and sort
- CI/CD (in the real world project, I'd like to integrate CI/CD)

# About Responsive:
- This project is not suitable for responsive because it contains to many fields to display nicely on
mobile devices

# About authentication:
- This project does not contain full authentication feature
- This project should be used for in-house department only, so forgot password and register should be ommitted.