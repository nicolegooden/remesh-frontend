# Take Home Project - Front-end

This is the front-end repository for my take-home project.

### Set-Up Instructions

**Please start running the [back-end repository](https://github.com/nicolegooden/remesh) locally before trying to open this front-end repository.**

After the back-end repository is up and running on port 3000: 

From a new tab in the terminal CLI -
+ Ensure you are not inside of the back-end repository when you run the next command. `cd ..` if you are working from the same terminal tab and then `cd` into a different directory where you would like to save this front-end repository. 
+ Run `git clone git@github.com:nicolegooden/remesh-frontend.git` to clone a local copy of this repo.
+ Run `cd remesh-frontend` to change into the project directory locally.
+ Run `npm install` to install all dependencies included in `package.json`.
+ Run `npm start` to see and interact with the application via `localhost`
+ Run `npm test` to run the 4 available test suites. Expect to see 10 passing tests.

**NOTE: The back-end repository for this project is set to run on `localhost:3000. Be prepared to see a message that states: `Something is already running on port 3000. Would you like to run the app on another port instead?` Type `y`, then your code editor will start the development build on a different port. Mine defaults to `localhost:3001`.**

### Project Specifications

Goal: Create a full-stack application that allows users to create conversations, add messages to conversations, and reply to messages with thoughts. The outcome is a platform for users to share ideas with many people.

**Features**

Users should be able to...

+ Create a conversation
+ Create messages
+ Create thoughts
+ View Conversations
+ View Conversation Messages
+ View Message Thoughts
+ Search Conversations by Title

