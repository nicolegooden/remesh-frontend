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
+ To view the code, open this repository in your code editor of choice. 

**NOTE: The back-end repository for this project is set to run on `localhost:3000`. Be prepared to see a message that states: `Something is already running on port 3000. Would you like to run the app on another port instead?` Type `y`, then your code editor will start the development build on a different port. Mine defaults to `localhost:3001`.**

### Project Specifications

No styling or CSS may be implemented.

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

### Wins

+ Dynamic Search - As the user searches for conversations by title, matching conversations render automatically. No button needed!

+ React Hooks - This project consists entirely of functional components; no class-based components or `this.state`! This is the first time I have fully implemented React Hooks (mainly `useState` and `useEffect`), which has led to cleaner and more readable code.

+ Unit and Integration Testing with Hooks - I am very familiar with React Testing Library and Jest, but I have never tested functional components with React Hooks. After running into several errors and warnings stating that my tests might lead to false positives due to potentially running tests before the `useState` setter has updated the state (therefore updating the DOM), I learned how to use `act()` from `react-dom`. I wrapped my `render()` in each test suite with `act()` so that my test suite could account for the asynchronous React Hooks and accurately update the render before any assertions were made. This provides for more accurate and reliable testing!

+ Encapsulation - I planned this component structure such that each component is only aware of the data it needs to function as expected. For example, `App` holds onto all conversations retrieved from the database, and nothing more. Each `Conversation` holds onto its messages via a container, each `Message` holds onto its thoughts via a container, etc. I chose to make GET requests for conversations, thoughts, and messages when the information is needed by the user, but not any earlier. I believe the performance of my application is attributed to this design.
