Bank of Sentosa
===============

#### Prerequisites
 
 1. Node v12+
 2. npm 6+
 3. A unix based OS. (Windows compliant scripts have not been produced)
 4. Chrome browser (No other browsers have been tested)

### Operations

Operations have been provided by way of scripts. These are all location in the ```scripts``` directory.

In order to grant yourself permissions to execute these run the following command from the root folder.

```
chmod -R 755 scripts
```

#### Setup

```
./scripts/install.sh
```

Execute the install script from the project root directory.

This script installs the ```node_modules``` and seeds the database.

#### Launch api

```
./scripts/launch-api.sh
```

#### Launch Web

```
./scripts/launch-web.sh
```

In order to access the website locally launch the server first then the web using the 2 scripts above. Then access the website on

```
http://localhost:3000
```

A chrome browser instance should be launched on this address automatically. There are 2 users created by the data seed script

 1. admin@sentosabank.com
 2. dan.larimer@eos.io

The password for both is ```passw0rd```

#### Execute Tests

```
./scripts/test.sh
```

The test script automatically starts up and shuts down required services. It is designed as a hook ready for incorporation into CI

#### Project Structure

The project has 3 tiers. The web tier runs locally on port 3000. 

The api is exposed on HTTP on an Express web server hosted locally on port 3001.

THe database is a MongoDB instance hosted remotely on MongoDB Atlas.

#### Structure Motivation

It goes without saying that the solution is not "production quality" or anything like it. Due to time constraints (this project was timeboxed to 3 days) certain facets have been prioritised at the expense of others.

Focus has been on the following items

 1. Clean code
 2. Functioning component tests
 
Since clean code and automated tests have been mentioned specifically in the question.

#### Testing

The most important tests for the UI are component testing and integration testing. Component testing essentially being the same except being "stubbed".

For complex systems stubbing invariably involves implementing a mock api with a degree of intelligence in order to adequately test user journeys.

NodeJS / ExpressJS / MongoDB have been selected as tools for the api on this project as they would be prime candidates to code a mock back end on a production system. Indeed the api contained in this project is a close approximation of what a mock api on which to run component tests as part of the CI process would look like.

The component tests run in a headless chromium and in this way could be executed on a GUIless Unix box spun up as part of the automated build process.
 
Screenshots are captured at certain intervals as a diagnosis tool in the event of failure.

### Actions

There are 3 actions a user can make. 

 1. Login
 2. Logout
 3. Create a transfer between accounts 
 
### Screens 
 
There are 5 screens to support these actions

 1. Login / Landing Screen
 2. Accounts Summary Screen (Home)
 3. Transactions Screen (Account Detail)
 4. Transfers Screen
 5. Create Transfer Screen

### Security

Security is provided by way of a JWT token sent to the client as a response to a valid login. Protected routes require a valid token for access to be granted. Otherwise the user is redirected to the login screen.

No other security mechanisms have been implemented 

### Caveats

There are numerous shortcomings and limitations. Too numerous to mention, I shall list here just one

 1. No consideration is given to available funds in an account. Each account is assumed to have an infinite overdraft facility. 