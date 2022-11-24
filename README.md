# MAIKo+ event viewer app

## Overview

This is an event viewer application runs on web browsers.\
You can check hit patterns and shapes of signals of every events acquired with MAIKo+ by accessing this app. 

## Preparation

- Start JSON API server (MAIKo2_JSON_API)  

    - Index tables on PostgresSQL are also required. 
    - See details in README.md of MAIKo2_JSON_API repository.
    - In descriptions below, `the API server is assumed to be running on the localhost:3000.`
- Prepare two environment variables in ".env" files at the top level of this source.

    1. REACT_APP_API_URI_PREFIX\
        The part of URI before the parameters (run id, event number) input for the JSON API.\
        This value is required for accessing the API server in App.js.\
        For running this app on development server (i.e. npm start), the part of URI after port number is enough for the purpose because of "proxy" setting in package.json.
    
    2. PUBLIC_URL\
        The URL for this app. \
        This value is used in index.html.
        This is required only for production build.

    - Examples (in the case API server and this app is running on the server named cogito)
        - .env.production
        ```
        REACT_APP_API_URI_PREFIX="http://cogito:8080/get/"
        PUBLIC_URL=http://cogito:3000
        ```
         - .env.development
        ```
        REACT_APP_API_URI_PREFIX="/get/"
        ```
- Start (production) server 
    1. Build this code `$ npm run build`. 
    2. Start the application server `$ serve -s build`.

- Start development server [optional]
    1. Start server `$ npm start`

## Usage
Access via port 3000 of the server on which the app runs with web browsers.


## Functions

- Visualizing event data
    - Timing and hit patterns on the anode and cathode planes
    - Signals on the anode and cathode recorded with FADCs
- Accessing arbitrary event
    - Adjacent runs and events
    - User-specified run and event number
- Automatic event transitions
    - Variable speed (0.5, 1, 2, events/sec)
    - User-specified list of event numbers
- Downloading event data in JSON format