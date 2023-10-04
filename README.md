# Firebase Handler
A wrapper for Firestore, Realtime Database, and Storage services provided by the firebase-admin library.
It's designed to handle singleton instances of those Firebase services, simplifying the access to them.

[![license](https://img.shields.io/github/license/luc-mo/firebase-handler?color=blue)](https://github.com/luc-mo/firebase-handler/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@snowdrive/firebase-handler/latest?color=blue)](https://www.npmjs.com/package/@snowdrive/firebase-handler)
[![npm downloads](https://img.shields.io/npm/dm/@snowdrive/firebase-handler)](https://www.npmjs.com/package/@snowdrive/firebase-handler)


## Table of Contents
* [Features](#features)
* [Installation](#installation)
  - [Configuration](#configuration)
  - [Logger](#logger)
  - [Initialization](#initialization)
* [Usage](#usage)
  - [Firestore](#firestore)
  - [Realtime Database](#realtime-database)
  - [Storage](#storage)
  - [Disconnect](#disconnect)
* [Development](#development)
  - [Scripts](#scripts)
* [Dependencies](#dependencies)
* [Repository](#repository)
* [License](#license)


## Features
- Singleton instance handlers for Firestore, Realtime Database, and Storage.
- Built-in disconnect method for easy cleanup.
- Fully TypeScript support.


## Installation
```bash
npm install @snowdrive/firebase-handler
yarn add @snowdrive/firebase-handler
pnpm add @snowdrive/firebase-handler
```


## Usage
Make sure to initialize the library with the required dependencies.


### Configuration
Firebase app credentials can be configurated in three ways:
- Using `applicationDefault` function from the firebase-admin library.
- Using a service account object or a path to a JSON file.
- Using a refresh token.

Note: By default, if you don't provide any credentials, the library will try to connect to the services using the `applicationDefault` option.

#### Service account and refresh token
```ts
const credentialConfig = {
  serviceAccount: {
    projectId: "<PROJECT_ID>",
    clientEmail: "foo@<PROJECT_ID>.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----<KEY>-----END PRIVATE KEY-----\n"
  },
  // or
  refreshToken: "<REFRESH_TOKEN>"  
}

const config = {
  firebase: {
    credential: credentialConfig
  }
}
```

You can also provide the path to a JSON file containing the service account or the refresh token configuration.To read more about the Firebase App initialization, check the [official documentation](https://firebase.google.com/docs/admin/setup#initialize-sdk).

Note: If you try to use both configuration properties, the service account object will be prioritized.

#### Database and Storage
To configurate the Realtime Database and Storage Bucket, you can use the `databaseURL` and `storageBucket` properties respectively.

```ts
const config = {
  firebase: {
    credential: { /* Previous configuration */ },
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
    storageBucket: '<PROJECT_ID>.appspot.com',
  }
}
```
Note: Both are optional, but you won't be able to use the services that require them.

#### Additional settings
You can also provide the Firestore settings, which are optional, including the top-level configuration property. Also, you can use the "handlers" configuration to use our recommended settings for the services.
```ts
const config = {
  firestore: {
    // All compatible firestore settings provided by the firebase-admin library.
  },
  handlers: {
    useFirestoreRecommendedSettings: true, // Enable recommended settings for Firestore.
  }
}
```

The Firestore recommended settings enable `ignoreUndefinedProperties` property.


### Logger
Set up your logger (here's a basic example):

```ts
const logger = {
  info: (message, data) => { console.log(message, data) },
  error: (message, data) => { console.error(message, data) }
}
```


### Usage
Using the provided configurations:

```ts
import * as admin from 'firebase-admin'
import { FirebaseHandler } from '@snowdrive/firebase-handler'

const dependencies = {
  admin: admin,
  config: config,
  logger: logger
}

const firebaseHandler = new FirebaseHandler(dependencies)
```

#### Firestore Database
```ts
const firestore = firebaseHandler.getFirestoreInstance()
```

#### Realtime Database
```ts
const realtimeDb = firebaseHandler.getRealtimeInstance()
```
Note: Ensure your configuration includes `databaseURL`.

#### Storage Bucket
```ts
const storage = firebaseHandler.getStorageInstance()
```
Note: Ensure your configuration includes `storageBucket`.

#### Disconnect
To disconnect from all services:
```ts
firebaseHandler.disconnect()
```


## Development

### Scripts
- **build**: Compiles the TypeScript code.
- **test**: Runs tests.
- **test:watch**: Runs tests in watch mode.
- **lint** & **format**: For checking and formatting code respectively.

## Dependencies
- [Firebase Admin SDK](https://www.npmjs.com/package/firebase-admin)
- [Biome toolchain](https://www.npmjs.com/package/@biomejs/biome)
- [Tsup bundler](https://www.npmjs.com/package/tsup)
- [TypeScript language](https://www.npmjs.com/package/typescript)
- [Vitest testing framework](https://www.npmjs.com/package/vitest)
- [Environment variables loader](https://www.npmjs.com/package/dotenv)
- [Cross-platform environment variables setter](https://www.npmjs.com/package/cross-env)


## Repository
Explore the source code, report issues, or contribute to the development of this project at our [GitHub Repository](https://github.com/luc-mo/firebase-handler).
Your feedback and contributions are highly appreciated!


## License
This project is licensed under the GPL-3.0-or-later. See the [LICENSE](https://github.com/luc-mo/firebase-handler/blob/HEAD/LICENSE) file in the repository for details.
