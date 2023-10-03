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
- TypeScript support out of the box.

## Installation
```bash
npm install @snowdrive/firebase-handler
yarn add @snowdrive/firebase-handler
pnpm add @snowdrive/firebase-handler
```

## Usage
Make sure to initialize the library with the required dependencies.

### Configuration
Provide the Firebase configuration details:

```ts
const config = {
  firebase: {
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
    storageBucket: '<PROJECT_ID>.appspot.com'
  }
}
```
Note: Both are optional, but you won't be able to use the services that require them.

You can also provide the Firestore settings, which are optional, including the top-level configuration property. Also, you can use the "handlers" configuration to use our recommended settings for the services.
```ts
const config = {
  firestore: {
    // All compatible firestore settings provided by the firebase-admin library.
  },
  handlers: {
    useFirestoreRecommendedSettings: true, // Recommended settings for firestore.
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

### Initialization
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

### Firestore
```ts
const firestore = firebaseHandler.getFirestoreInstance()
```

### Realtime Database
```ts
const realtimeDb = firebaseHandler.getRealtimeInstance()
```
Note: Ensure your configuration includes `databaseURL`.

### Storage
```ts
const storage = firebaseHandler.getStorageInstance()
```
Note: Ensure your configuration includes `storageBucket`.

### Disconnect
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
